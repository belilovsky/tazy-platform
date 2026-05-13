-- TAZY.PRO Evidence Registry — initial schema v0.1
-- Reference: docs/strategy v4, data model section

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS ltree;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ===== Core: dogs =====
CREATE TABLE IF NOT EXISTS dogs (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name            TEXT NOT NULL,
    name_kz         TEXT,
    name_en         TEXT,
    sex             CHAR(1) CHECK (sex IN ('M','F')),
    birthdate       DATE,
    colour          TEXT,
    region          TEXT,
    microchip       VARCHAR(15) UNIQUE,
    taban_ref_hash  TEXT,
    fci_number      TEXT,
    skk_number      TEXT,
    status          SMALLINT DEFAULT 0,
    completeness    SMALLINT DEFAULT 0,
    lineage_path    ltree,
    public          BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMPTZ DEFAULT now(),
    updated_at      TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_dogs_status ON dogs(status);
CREATE INDEX IF NOT EXISTS idx_dogs_region ON dogs(region);
CREATE INDEX IF NOT EXISTS idx_dogs_lineage ON dogs USING gist(lineage_path);

-- ===== Owners (PII-sensitive) =====
CREATE TABLE IF NOT EXISTS owners (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    iin_hmac        TEXT UNIQUE NOT NULL,
    display_name    TEXT,
    region          TEXT,
    contact_visible BOOLEAN DEFAULT FALSE,
    email_encrypted BYTEA,
    phone_encrypted BYTEA,
    consent_at      TIMESTAMPTZ,
    verified_at     TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS dog_ownership (
    dog_id          UUID REFERENCES dogs(id) ON DELETE CASCADE,
    owner_id        UUID REFERENCES owners(id) ON DELETE RESTRICT,
    role            TEXT NOT NULL DEFAULT 'primary',
    since           DATE,
    until           DATE,
    PRIMARY KEY (dog_id, owner_id, role)
);

-- ===== Breeders =====
CREATE TABLE IF NOT EXISTS breeders (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    kennel_name     TEXT NOT NULL,
    kennel_name_kz  TEXT,
    registration    TEXT,
    region          TEXT,
    tier            SMALLINT DEFAULT 1,
    badges          TEXT[],
    suspended_at    TIMESTAMPTZ,
    suspension_reason TEXT,
    created_at      TIMESTAMPTZ DEFAULT now()
);

-- ===== Pedigree =====
CREATE TABLE IF NOT EXISTS pedigree_edges (
    child_id        UUID PRIMARY KEY REFERENCES dogs(id) ON DELETE CASCADE,
    sire_id         UUID REFERENCES dogs(id),
    dam_id          UUID REFERENCES dogs(id),
    source          TEXT,
    confidence      SMALLINT CHECK (confidence BETWEEN 1 AND 3),
    verified_by     UUID,
    verified_at     TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_ped_sire ON pedigree_edges(sire_id);
CREATE INDEX IF NOT EXISTS idx_ped_dam ON pedigree_edges(dam_id);

-- ===== Litters =====
CREATE TABLE IF NOT EXISTS litters (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sire_id         UUID REFERENCES dogs(id),
    dam_id          UUID REFERENCES dogs(id),
    breeder_id      UUID REFERENCES breeders(id),
    mating_date     DATE,
    birth_date      DATE,
    puppy_count     SMALLINT,
    males_count     SMALLINT,
    females_count   SMALLINT,
    status          TEXT DEFAULT 'declared',
    notes           TEXT,
    created_at      TIMESTAMPTZ DEFAULT now()
);
