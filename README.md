# How to install
  - <a href="https://www.google.co.id/search?q=how+to+create+bot+telegram&oq=how+to+create+bot+telegram&aqs=chrome..69i57j0l5.6704j0j7&sourceid=chrome&ie=UTF-8"> Create yout bot</a>  
  - run npm install nodemon -g (for developmen mode)
  - run npm install forever -g 
  - import database 
  - clone or downloads the repository
  - patch to tbot directory 
  - run npm install 
  - edit .env file <br>
    you will find some simple configurations in it, please adjust it with your server or computer. 
  - run npm run nodemon (for development mode)
  - run forever start index.js for  
  
  
  <b>#notes </b> 
  <br> on your computer must have installed the js, npm and mysql servers
  

# how to use
- send /start in your bot for starting message/dev mode
- /test  for checking datase server 
- creating new comand   create[?request=your request code or message ,?response= your respon to user  ] <br>
example = create[?request=hello,?response=Hi]
- update the comand update[?request=new request code ,?response=new response ,?where=your coman request /name] <br>
exampel:update[?request=hello,?response=hai,?where=hello]
- delete comand   destroy[?where=your request code .message] <br>
example: destroy[?where=hello]

#special comand
- ?name         : for get user name
- ?botname      : for bot name
- ?firstname    : for get the user first name
- ?lastname     : for get the user last name
<br>
    example :     create[?request=hello,?response=hello ?name];
