Task = React.createClass({
    propTypes: {
        
        // we ca use the pop type to indicate that is t is reqiuieds
        
        task: React.PropTypes.object.isRequired,
        showPrivateButton: React.PropTypes.bool.isRequired
    },
    
    toggleChecked() {
        // Set the checked property to the opposite of its curent value
        
        Meteor.call("setChecked", this.props.task._id, ! this.props.task.checked);
        
    },
    
    
    deleteThisTask() {
        
        Meteor.call("removeTask", this.props.task._id);
        
    },
    
    togglePrivate() {
      Meteor.call("setPrivate", this.props.task._id, ! this.props.task.private);  
    },
    
    
    render() {
        
        // giving tasks a different class name when they are checjked
        // so we can style the nicely in css
        const taskClassName = (this.props.task.checked ? "checked" : "") + " " +
         (this.props.task.private ? "private" : "");
        
        return (
            
            <li className={taskClassName}>
               <button className="delete" onClick={this.deleteThisTask}>
               
               &times;
               
               </button>
               
                 <input
                    type="checkbox"
                    readOnly={true}
                    checked={this.props.task.checked}
                    onClick={this.toggleChecked} />
                    
                    { this.props.showPrivateButton ? (
                    
                        <button className="toggle-private" onClick={this.togglePrivate}>
                        
                        {this.props.task.private ? "Private" : "Public" }
                        
                        </button>
                    ) : ''}
                    
                    <span className=""text>
                    
                     <strong>{this.props.task.username}</strong> :{this.props.task.text}
                    
                    </span>
            </li>
              
        );
    }
});