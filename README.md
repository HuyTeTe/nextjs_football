This is a starter template for [Learn Next.js](https://nextjs.org/learn).

Image banner homepage: 760x486

SELECT COUNT(*)  FROM bot_random_entity WHERE is_locking = 1

SELECT * FROM bot_random_entity WHERE is_locking =1

SELECT * FROM new_match_entity nme order by entity_id DESC

select entity_id FROM new_match_entity nme WHERE entity_id < 46688 and `result` = 2

UPDATE new_match_entity SET result = 0 WHERE entity_id > 46688 and `result` = 2


SELECT COUNT(*) FROM bot_list_item

SELECT COUNT(*) FROM bot_list_entity

SELECT * FROM bot_random_entity WHERE entity_id=10365

update bot_random_entity SET is_locking = 0 WHERE is_locking = 1

SELECT * FROM new_match_entity ew

SELECT @@system_time_zone;

SELECT TIMEDIFF(NOW(), UTC_TIMESTAMP);

SELECT table_schema AS "Database", SUM(data_length + index_length) / 1024 / 1024 AS "Size (MB)" FROM information_schema.TABLES GROUP BY table_schema