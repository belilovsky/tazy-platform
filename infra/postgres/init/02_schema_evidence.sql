-- Evidence: health, DNA, BLUP, field trials, shows, audit, exports

CREATE TABLE IF NOT EXISTS health_tests (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dog_id          UUID REFERENCES dogs(id) ON DELETE CASCADE,
    test_type       TEXT NOT NULL,
    lab_or_vet      TEXT,
    test_date       DATE,
    result          TEXT,
    result_code     TEXT,
    attachment_url  TEXT,
    attachment_hash TEXT,
    is_public       BOOLEAN DEFAULT TRUE,
    verified_by     UUID,
    verified_at     TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_health_dog ON health_tests(dog_id);
CREATE INDEX IF NOT EXISTS idx_health_type ON health_tests(test_type);

CREATE TABLE IF NOT EXISTS dna_samples (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dog_id          UUID REFERENCES dogs(id) ON DELETE CASCADE,
    lab             TEXT,
    sample_id       TEXT,
    parentage_status TEXT,
    genetic_coi     NUMERIC(6,4),
    roh_segments    JSONB,
    diversity_markers JSONB,
    submitted_at    TIMESTAMPTZ,
    result_at       TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS blup_predictions (
    dog_id          UUID REFERENCES dogs(id) ON DELETE CASCADE,
    trait           TEXT,
    value           NUMERIC(6,3),
    confidence      NUMERIC(4,3),
    calculated_at   TIMESTAMPTZ DEFAULT now(),
    PRIMARY KEY (dog_id, trait)
);

CREATE TABLE IF NOT EXISTS field_trials (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dog_id          UUID REFERENCES dogs(id) ON DELETE CASCADE,
    event_id        UUID,
    judge_name      TEXT,
    region          TEXT,
    trial_date      DATE,
    weather         JSONB,
    distance_m      INTEGER,
    speed_score     NUMERIC(4,2),
    manoeuvrability NUMERIC(4,2),
    endurance       NUMERIC(4,2),
    reaction        NUMERIC(4,2),
    total_score     NUMERIC(5,2),
    video_url       TEXT,
    gps_track_url   TEXT,
    raw_gps_data    JSONB,
    created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS show_results (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dog_id          UUID REFERENCES dogs(id) ON DELETE CASCADE,
    event           TEXT,
    judge           TEXT,
    class           TEXT,
    placement       SMALLINT,
    title           TEXT,
    show_date       DATE,
    source_doc_url  TEXT,
    created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS behaviour_assessments (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dog_id          UUID REFERENCES dogs(id) ON DELETE CASCADE,
    assessor        TEXT,
    method          TEXT,
    assessment_date DATE,
    temperament     TEXT,
    notes           TEXT,
    score           NUMERIC(4,2),
    created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS international_registrations (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dog_id          UUID REFERENCES dogs(id) ON DELETE CASCADE,
    country_code    CHAR(2),
    club_code       TEXT,
    foreign_id      TEXT,
    registered_at   DATE,
    notes           TEXT
);

-- Immutable audit log for verification events
CREATE TABLE IF NOT EXISTS verification_events (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dog_id          UUID REFERENCES dogs(id) ON DELETE RESTRICT,
    event_type      TEXT NOT NULL,
    from_status     SMALLINT,
    to_status       SMALLINT,
    actor_id        UUID,
    actor_role      TEXT,
    evidence_hash   TEXT,
    notes           TEXT,
    created_at      TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_ve_dog ON verification_events(dog_id);

CREATE OR REPLACE FUNCTION block_audit_mutation() RETURNS trigger AS $$
BEGIN
  RAISE EXCEPTION 'verification_events is append-only';
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_ve_no_update ON verification_events;
CREATE TRIGGER trg_ve_no_update BEFORE UPDATE OR DELETE ON verification_events
FOR EACH ROW EXECUTE FUNCTION block_audit_mutation();

CREATE TABLE IF NOT EXISTS exports (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_type     TEXT,
    generated_at    TIMESTAMPTZ DEFAULT now(),
    schema_version  TEXT,
    included_count  INTEGER,
    file_url        TEXT,
    generated_by    UUID
);

CREATE TABLE IF NOT EXISTS media_assets (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dog_id          UUID REFERENCES dogs(id) ON DELETE CASCADE,
    kind            TEXT,
    url             TEXT,
    copyright       TEXT,
    consent         BOOLEAN DEFAULT FALSE,
    is_public       BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMPTZ DEFAULT now()
);
