# yoav-videos-project

very important:    

1. routs - on api.js we did routs to :

register (on routes.js) - and named it 'users' . 

login (on routes.js) - and named it 'authenticate' . 

also for all the CRUD functionality :

getVideos/:userName - not mentioned at all at routes.js .

regForm - not mentioned at all at routes.js .

/editVideo/ - not mentioned at all at routes.js .

/deleteVideo/ - not mentioned at all at routes.js .

All the above is working fine , the thing is that when you type in 'http://localhost:3000/....' the route - it gives you nothing except redirecting back to home page 

If you type http://localhost:3000/authenticate - gives you nothing..

If you type http://localhost:3000/users - gives you nothing..

If you type http://localhost:3000/editVideo - gives you nothing..

and..

If you type http://localhost:3000/getVideos/:achieven3 - gives you the error message = {"success":false,"message":"No videos included"} which is not ok because there is videos on that user...

So i need u to clean that mess , and for all i know behind the scenes everything is working fine except for that issues..

If something not clear to you - feel free to let me know so i can explain better .

Also - there are 2 more minor issues : 

2. When you logged in and press on the navbar logout button - it's not doing nothing , and only after you click on other button on navbar - it logs you out . this bug only happens when you try to logout while you at home page . if you try to logout when you are on videos or profile - it logs you out as supposed to be .

3. When you logged in and then logging out - then you go back to login page , when you try to type data in the inputs it's not letting you type and triggers the following error :"  TypeError: Cannot create property 'userName' on string ''  " . If you refresh the page - the error is gone and you can type again into the inputs . This is only happens on login page and not on register . 

Thats it , hopefully you'll manage to figure those issues . 

Thanx again . 


