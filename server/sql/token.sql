CREATE TABLE "tokens" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" UUID NOT NULL,
  "token" TEXT NOT NULL,
  "expires_at" TIMESTAMP NOT NULL
);

ALTER TABLE "tokens"
ADD CONSTRAINT fk_tokens_user_id
FOREIGN KEY ("user_id") REFERENCES "users" ("id")
ON DELETE CASCADE;