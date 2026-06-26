ALTER TABLE "products" ADD COLUMN "category_id" uuid;--> statement-breakpoint
UPDATE "products" AS "product"
SET "category_id" = "category"."id"
FROM "categories" AS "category"
WHERE lower(trim("product"."category")) = lower(trim("category"."name"));--> statement-breakpoint
UPDATE "products"
SET "category_id" = (
	SELECT "id"
	FROM "categories"
	ORDER BY "created_at", "id"
	LIMIT 1
)
WHERE "category_id" IS NULL;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "category_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "products_category_id_idx" ON "products" USING btree ("category_id");--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "category";
