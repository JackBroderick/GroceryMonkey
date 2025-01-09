select users.*, bananas.banana_count from users, (select user_id, count(item) as banana_count from grocerylisttable where status_id = 5 and strftime('%m', date) = strftime('%m', 'now') group by user_id order by banana_count desc) as bananas where users.user_id = bananas.user_id;


select user_id, count(item) as banana_count from grocerylisttable where status_id = 5 and strftime('%m', date) = strftime('%m', 'now') group by user_id order by banana_count desc;

select * from users left join (select user_id, count(item) as banana_count from grocerylisttable where status_id = 5 and user_id != requestor_id and strftime('%m', date) = strftime('%m', 'now') group by user_id order by banana_count desc) as bananas on users.user_id = bananas.user_id;

select month, user_id, username, max(banana_count) as max_bananas from (select strftime('%Y-%m-02', date) as month, user_id, username, count(item) as banana_count from grocerylist where status_id = 5 and user_id != requestor_id group by strftime('%Y-%m', date), user_id) as banana_history group by month;

select banana_history.month, banana_history.requestor_id, users.name, max(banana_history.request_count) as max_requests from (select strftime('%Y-%m-02', date) as month, requestor_id, count(item) as request_count from grocerylist where requestor_id > 0 group by strftime('%Y-%m', date), requestor_id) as banana_history left join (select user_id, name from users) as users on banana_history.requestor_id = users.user_id;

