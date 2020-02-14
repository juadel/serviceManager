<div className="App">
      
<div className="grid-container">
{/* <Sidebar clasName="grid-sidebar" /> */}
  

<div className="header" >
  <Authenticator hideDefault={true}>
      
      <Greetings inGreeting={(username) => 'Hello ' + username} />
  </Authenticator>
</div>

<div className="content">
</div>
</div>