CREATE TABLE "practice_session" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"kind" text NOT NULL,
	"pattern" text,
	"duration_seconds" integer NOT NULL,
	"felt_after" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "practice_session" ADD CONSTRAINT "practice_session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "practice_user_created_idx" ON "practice_session" USING btree ("user_id","created_at" DESC NULLS LAST);