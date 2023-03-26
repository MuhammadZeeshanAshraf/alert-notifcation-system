CREATE DATABASE pager;

  -- public.monitored_services definition

-- Drop table

-- DROP TABLE public.monitored_services;

CREATE TABLE public.monitored_services (
	id int4 NOT NULL DEFAULT nextval('monitored_service_id_seq'::regclass),
	"name" varchar(255) NOT NULL,
	description varchar(255) NULL,
	is_healthy bool NOT NULL DEFAULT true,
	CONSTRAINT monitored_service_pkey PRIMARY KEY (id)
);

INSERT INTO public.monitored_services
(id, "name", description, is_healthy)
VALUES(2, 'Service B', 'This is a description of Service B', true);
INSERT INTO public.monitored_services
(id, "name", description, is_healthy)
VALUES(3, 'Service C', 'This is a description of Service C', true);
INSERT INTO public.monitored_services
(id, "name", description, is_healthy)
VALUES(1, 'Service A', 'This is a description of Service A', true);


  CREATE DATABASE escalation_policy;

  -- DROP TYPE public.alert_type;

CREATE TYPE public.alert_type AS ENUM (
	'SMS',
	'email');

-- DROP TYPE public.level_type;

CREATE TYPE public.level_type AS ENUM (
	'level_1',
	'level_2',
	'level_3');


-- public.monitored_services definition

-- Drop table

-- DROP TABLE public.monitored_services;

CREATE TABLE public.monitored_services (
	id int4 NOT NULL DEFAULT nextval('monitored_service_id_seq'::regclass),
	"name" text NOT NULL,
	description text NULL,
	CONSTRAINT monitored_service_pkey PRIMARY KEY (id)
);


-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	id serial4 NOT NULL,
	"name" varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	phone_number varchar(255) NOT NULL,
	CONSTRAINT unique_email UNIQUE (email),
	CONSTRAINT unique_phone_number UNIQUE (phone_number),
	CONSTRAINT users_pkey PRIMARY KEY (id)
);


-- public.alert_acknowledgments definition

-- Drop table

-- DROP TABLE public.alert_acknowledgments;

CREATE TABLE public.alert_acknowledgments (
	id serial4 NOT NULL,
	alert_id int4 NOT NULL,
	is_acknowledged bool NOT NULL DEFAULT false,
	acknowledged_by int4 NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	update_at timestamp NOT NULL DEFAULT now(),
	policy_id int4 NULL,
	message varchar(255) NULL,
	CONSTRAINT acknowledgment_pkey PRIMARY KEY (id)
);


-- public.escalation_policies definition

-- Drop table

-- DROP TABLE public.escalation_policies;

CREATE TABLE public.escalation_policies (
	id serial4 NOT NULL,
	"name" varchar(255) NOT NULL,
	monitored_service_identifier int4 NOT NULL,
	target_group_id int4 NOT NULL,
	CONSTRAINT escalation_policies_pkey PRIMARY KEY (id)
);


-- public.policy_target_groups definition

-- Drop table

-- DROP TABLE public.policy_target_groups;

CREATE TABLE public.policy_target_groups (
	id int4 NOT NULL DEFAULT nextval('policy_target_group_id_seq'::regclass),
	policy_id int4 NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT policy_target_group_pkey PRIMARY KEY (id)
);


-- public.policy_targets definition

-- Drop table

-- DROP TABLE public.policy_targets;

CREATE TABLE public.policy_targets (
	id serial4 NOT NULL,
	user_id int4 NOT NULL,
	level_type public.level_type NOT NULL,
	alert_type public.alert_type NOT NULL,
	target_group_id int4 NULL,
	CONSTRAINT policy_targets_pkey PRIMARY KEY (id)
);


-- public.alert_acknowledgments foreign keys

ALTER TABLE public.alert_acknowledgments ADD CONSTRAINT acknowledged_by_fk FOREIGN KEY (acknowledged_by) REFERENCES public.users(id);
ALTER TABLE public.alert_acknowledgments ADD CONSTRAINT alert_fk FOREIGN KEY (alert_id) REFERENCES public.escalation_policies(id);
ALTER TABLE public.alert_acknowledgments ADD CONSTRAINT policy_fk FOREIGN KEY (policy_id) REFERENCES public.monitored_services(id);


-- public.escalation_policies foreign keys

ALTER TABLE public.escalation_policies ADD CONSTRAINT service_fk FOREIGN KEY (monitored_service_identifier) REFERENCES public.monitored_services(id);
ALTER TABLE public.escalation_policies ADD CONSTRAINT target_group_fk FOREIGN KEY (target_group_id) REFERENCES public.policy_target_groups(id);


-- public.policy_target_groups foreign keys

ALTER TABLE public.policy_target_groups ADD CONSTRAINT policy_fk FOREIGN KEY (policy_id) REFERENCES public.escalation_policies(id);


-- public.policy_targets foreign keys

ALTER TABLE public.policy_targets ADD CONSTRAINT target_group_fk FOREIGN KEY (target_group_id) REFERENCES public.policy_target_groups(id);
ALTER TABLE public.policy_targets ADD CONSTRAINT user_fk FOREIGN KEY (user_id) REFERENCES public.users(id);

INSERT INTO public.users
(id, "name", email, phone_number)
VALUES(3, 'John Smith', 'john.smith@example.com', '123-456-7890');
INSERT INTO public.users
(id, "name", email, phone_number)
VALUES(4, 'Jane Doe', 'jane.doe@example.com', '234-567-8901');
INSERT INTO public.users
(id, "name", email, phone_number)
VALUES(5, 'Bob Johnson', 'bob.johnson@example.com', '345-678-9012');
INSERT INTO public.users
(id, "name", email, phone_number)
VALUES(2, 'Farhan Ashraf', 'zeeshangdp@gmail.com', '+923045606422');
INSERT INTO public.users
(id, "name", email, phone_number)
VALUES(1, 'Zeeshan Ashraf', 'cs16b633@gmail.com', '+923106304364');

INSERT INTO public.policy_targets
(id, user_id, level_type, alert_type, target_group_id)
VALUES(1, 1, 'level_1'::public.level_type, 'email'::public.alert_type, NULL);
INSERT INTO public.policy_targets
(id, user_id, level_type, alert_type, target_group_id)
VALUES(3, 1, 'level_1'::public.level_type, 'email'::public.alert_type, 1);
INSERT INTO public.policy_targets
(id, user_id, level_type, alert_type, target_group_id)
VALUES(4, 2, 'level_1'::public.level_type, 'SMS'::public.alert_type, 1);
INSERT INTO public.policy_targets
(id, user_id, level_type, alert_type, target_group_id)
VALUES(5, 3, 'level_1'::public.level_type, 'email'::public.alert_type, 2);
INSERT INTO public.policy_targets
(id, user_id, level_type, alert_type, target_group_id)
VALUES(6, 1, 'level_2'::public.level_type, 'SMS'::public.alert_type, 2);
INSERT INTO public.policy_targets
(id, user_id, level_type, alert_type, target_group_id)
VALUES(7, 3, 'level_2'::public.level_type, 'email'::public.alert_type, 2);
INSERT INTO public.policy_targets
(id, user_id, level_type, alert_type, target_group_id)
VALUES(8, 2, 'level_2'::public.level_type, 'email'::public.alert_type, 3);
INSERT INTO public.policy_targets
(id, user_id, level_type, alert_type, target_group_id)
VALUES(10, 2, 'level_3'::public.level_type, 'SMS'::public.alert_type, NULL);
INSERT INTO public.policy_targets
(id, user_id, level_type, alert_type, target_group_id)
VALUES(11, 3, 'level_3'::public.level_type, 'email'::public.alert_type, NULL);
INSERT INTO public.policy_targets
(id, user_id, level_type, alert_type, target_group_id)
VALUES(2, 1, 'level_2'::public.level_type, 'SMS'::public.alert_type, 1);
INSERT INTO public.policy_targets
(id, user_id, level_type, alert_type, target_group_id)
VALUES(9, 1, 'level_3'::public.level_type, 'email'::public.alert_type, 1);


INSERT INTO public.policy_target_groups
(id, policy_id, "name")
VALUES(1, 1, 'Target Group 1');
INSERT INTO public.policy_target_groups
(id, policy_id, "name")
VALUES(2, 1, 'Target Group 2');
INSERT INTO public.policy_target_groups
(id, policy_id, "name")
VALUES(3, 2, 'Target Group 3');


INSERT INTO public.monitored_services
(id, "name", description)
VALUES(1, 'Service A', 'This is a description of Service A');
INSERT INTO public.monitored_services
(id, "name", description)
VALUES(2, 'Service B', 'This is a description of Service B');
INSERT INTO public.monitored_services
(id, "name", description)
VALUES(3, 'Service C', 'This is a description of Service C');

INSERT INTO public.escalation_policies
(id, "name", monitored_service_identifier, target_group_id)
VALUES(1, 'Policy A', 1, 1);
INSERT INTO public.escalation_policies
(id, "name", monitored_service_identifier, target_group_id)
VALUES(2, 'Policy B', 2, 3);
INSERT INTO public.escalation_policies
(id, "name", monitored_service_identifier, target_group_id)
VALUES(3, 'Policy C', 3, 2);