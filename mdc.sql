CREATE TABLE "public.province" (
	"id" integer NOT NULL,
	"name" varchar NOT NULL UNIQUE,
	CONSTRAINT "province_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.district" (
	"id" integer NOT NULL,
	"province_id" integer NOT NULL,
	"unit" varchar NOT NULL,
	"name" varchar NOT NULL,
	"full_name" varchar NOT NULL,
	CONSTRAINT "district_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.ward" (
	"id" integer NOT NULL,
	"province_id" integer NOT NULL,
	"district_id" integer NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT "ward_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "district" ADD CONSTRAINT "district_fk0" FOREIGN KEY ("province_id") REFERENCES "province"("id");

ALTER TABLE "ward" ADD CONSTRAINT "ward_fk0" FOREIGN KEY ("province_id") REFERENCES "province"("id");
ALTER TABLE "ward" ADD CONSTRAINT "ward_fk1" FOREIGN KEY ("district_id") REFERENCES "district"("id");




