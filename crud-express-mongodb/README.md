# EXpress - crud

## 起步

-初始化
-模板处理

##路由设计

get    /students         渲染学生页面           无get参数         无post参数
get    /students/new     渲染添加学生页面        同上              同上
post   /students/new     添加学生               无get             name、age...
get    /students/edit    修改学生界面           id                无
post   /student/edit     修改学生信息           无                id、name、age...
get    /student/delete   删除学生               id                无