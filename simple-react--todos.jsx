Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
    // This code is executed on hte client only
    
    Accounts.ui.config({
        
       passwordSignupFields: "USERNAME_ONLY" 
       
    });
    
    Meteor.subscribe("tasks");
    
    Meteor.startup(function () {
        
        // use Meteor.startup to render the component after the page has already rendersd
        
        React.render(<App />, document.getElementById("render-target"));
        
    });
}

Meteor.methods({
   addTask(text) {
       // make sure the user is logged in before inserting the tasks
       if(! Meteor.userId()) {
           throw new Meteor.Error("not-authorized");
       }
       
       Tasks.insert({
           text: text,
           createdAt: new Date(),
           owner: Meteor.userId(),
           username: Meteor.user().username
       });
   },
   
   removeTask(taskId) {
   const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error("not-authorized");
    }
       Tasks.remove(taskId);
   },
   
   setChecked(taskId, setChecked) {
  const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error("not-authorized");
    }
       Tasks.update(taskId, {$set: { checked: setChecked}});
   },
   
   
   
   setPrivate(taskId, setToPrivate) {
       const task = Tasks.findOne(taskId);
      
     if (task.owner !== Meteor.userId()) {
         throw new Meteor.Error("not authorised");
     }
     
     Tasks.update(taskId, {$set: {private: setPrivate }});
     
   }
    
    
});

if (Meteor.isServer) {
    Meteor.publish("tasks", function() {
        return Tasks.find({
            $or: [
                { private: {$ne: true} },
                { owner: this.userId }
            ]
        });
    })
}