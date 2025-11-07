select * from refresh_tokens;
-- DELETE FROM refresh_tokens WHERE revoked = 1 OR expires_at < NOW();
-- ALTER TABLE refresh_tokens ADD CONSTRAINT unique_token_hash UNIQUE (token_hash);
-- DROP TABLE IF EXISTS refresh_tokens;


-- use pharmacy;