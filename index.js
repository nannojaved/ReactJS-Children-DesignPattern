import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import PropTypes from 'prop-types';

// this Fetch component is a reusable component, it will make ajax request, i.e., we will use jquery ajax method.
// this means this resuable Fetch component will send ajax request and we would be able to use this cmponent many times
// on different places. This means this would be a reusable component, but it will use children as design pattern.
class Fetch extends React.Component{
    constructor(){
        super();
        this.state={
            content:[]
        }
    }

    // because of ajax request, we should use componentDidMount(){}. ajax is also an utility method.
    // we use ajax method to fetch json data and add it in state parameter array: content
    // next task would be: how to pass content in App component
    componentDidMount(){
        $.ajax({
            // because this component is reusable, we could not design some things because these things are dynamic, like url
            // when we use this component on different places url will always be different. Thus we have to use: this.props.url

            // because url is required here, we should define it as propType
            url:this.props.url,            
            // success is a method
            success:(data)=>{                
                this.setState({
                    content:data
                })
            },
            // error is a method, and err is an object parameter, which will be received in case of error
            error:(err)=>{
                console.log("error: ", err);
            }
        })
    }

    render(){
        return(
            //// this is the way to pass state parameter content from Fetch to App
            <section>                
                {this.props.children(this.state.content)}
            </section>
        )
    }
}

Fetch.propTypes={
    url:PropTypes.string.isRequired
};

class App extends React.Component{
    render(){
        return(
            // <p>Hello World</p> : this will receive here in section tag as a children, this way we could render it
            // you could also pass it as string or function that we will see next, which is an interresting design pattern
            // additionally React also offers many utility methods that we could use here to pass <p>Hello World</p>, f.ex.,
            // {React.Children.only(this.props.children)}. This utility method renders only one child¨, so you could use div tag
            // to wrap other tags. Have a look at react.org - Docs
            // <section>{React.Children.only(this.props.children)}</section>

            // we pass Fetch component as a prop and receive it as children inside {}
            <section>
                <ul>
                <Fetch url="http://jsonplaceholder.typicode.com/posts">
                    {(data)=>{
                        return data.map((value, index)=>{
                            return <li key={index}>{value.title}</li>
                        })
                    }}
                </Fetch>
                
                <p><h1>Users</h1></p>
                <Fetch url="http://jsonplaceholder.typicode.com/users">
                    {(data)=>{
                        return data.map((value, index)=>{
                            return <li key={index}>{value.name}</li>
                        })
                    }}
                </Fetch>
                </ul>
            </section>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));