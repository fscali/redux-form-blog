import React, { Component } from 'react';
//Field is a component, reduxForm is a function simple to the function  "connect" of react-redux
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';


class PostsNewComponent extends Component {
    //the field property contains some event handlers that we have to wire to our JSX
    renderField(field) {
        //a little bit of es6 destructuring
        //the field object has a "meta" property, which has two properties touched and error
        //this way we put everything in local variables
        const { meta: {touched, error} } = field;

       // const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;
        return (
            
            <div className={className}>
                <label>{field.label}</label>
                <input 
                    type="text"
                    className="form-control"
                     {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values){
        
        
        //this.props.history is available because this component is rendered inside a Route component from react-router
       
        this.props.createPost(values, () => {
             this.props.history.push('/'); //this callback is handled by the action creator that we have prepared, after the POST has succeeded (it's a promise, @see actions/index.js)
        });

    }
    
    render() {

        const { handleSubmit } = this.props; //handleSubmit is a function that we have in our props because of the wiring
                                             // to the function reduxForm at the end of the file
                                             //this function manages the validation and the retrieval of values of the form and
                                             //if the form can be submitted, it calls our own  defined function onSubmit

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field 
                    label="Title"
                    name="title"
                    component={this.renderField}
                    />
                 <Field 
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                    />
                 <Field 
                    label="Content"
                    name="content"
                    component={this.renderField}
                    />
                <button type="submit" className="btn btn-primary">Submit</button>
               <Link className="btn btn-danger" to="/posts">Cancel</Link>
                 
            </form>

        );
    }
}

// redux-form handles validation easily for us
// values is an object that contains all the values
// that the user has entered into the form
// NB: the submit to the server is up to us..
function validate(values){
    const errors = {};
    //validate the inputs from the values
    if (!values.title) {
        errors.title = "Enter a title!";
    }

    if (!values.categories) {
        errors.categories = "Enter some categories!";
    }

    if (!values.content) {
        errors.content = "Enter the content of the post!";
    }

    return errors; //returning an empty object means that everything is valid for us and redux form lets the form to be submitted
                    // if errors has any property, redux-form assumes that the form is not valid
                    // the errors are put in the field.meta.error property to use while rendering the field
}

export default reduxForm({
    //validate: validate,
    validate, //will be called whenever the user tries to submit the form
    form: 'PostsNewForm' //name of the form
})(
    connect(null,{ createPost })(PostsNewComponent) //this is how we stack out multiple connect-like helpers
);