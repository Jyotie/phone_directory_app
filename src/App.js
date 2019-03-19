import React, { Component, PureComponent, Fragment } from "react";
// import {render} from 'react-dom'
import { Link, Switch, Route, withRouter }from "react-router-dom";

// import logo from './logo.svg';
import './App.css'; 

/*Header*/
const Header = props => {
  return <header className="header">{props.children}</header>;
};
/*Contact list*/
const Contacts = props => {
  const contactList = props.list.map((contact, id) => {
    return (
      <tr key={id}>
        <td>{contact.name}</td>
        <td>{contact.phone}</td>
        <td>
          <button onClick={() => props.onDelete(contact.id)} className="btn btn-danger">DELETE</button>
        </td>
      </tr>
    );
  });
  return (
    <table className="table table-dark">
      <thead>
		<tr>
		  <th scope="col">NAME</th>
		  <th scope="col">PHONE</th>
		  <th scope="col"></th>
		</tr>
	  </thead>
        {contactList}
    </table>
  );
};

/*Add contact component & event*/
class AddContact extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      error: false,
      errorMessage: ""
    };
  }
  onChangeName = event => {
    this.setState({
      name: event.target.value
    });
  };
  onChangePhone = event => {
    this.setState({
      phone: event.target.value
    });
  };
  addContact = event => {
    event.preventDefault();
    const phone = this.state.phone;
    if (isNaN(phone) || phone.length !== 10) {
      this.setState({
        error: true,
        errorMessage: "Enter a valid phone no."
      });
    } else {
      this.props.addContact({
        name: this.state.name,
        phone: this.state.phone
      });
    }
  };
  render() {
    let errorMessage;
    if (this.state.error) {
      errorMessage = this.state.errorMessage;
    }
    return (
      <Fragment>
        <Header>ADD A SUBSCRIBER</Header>
        <div className="container">
          <Link to="/" className="form__link">
            Go Back
          </Link>
          <form className="AddContact__form" onSubmit={this.addContact}>
            <div className="form__control">
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                id="name"
                onChange={this.onChangeName}
                required
              />
            </div>
            <div className="form__control">
              <label htmlFor="phone">Phone: </label>
              <input
                type="text"
                id="phone"
                onChange={this.onChangePhone}
                required
              />
            </div>
            <h5 className="form__error">{errorMessage}</h5>
            <hr />
            <h5 className="text-info">Subscriber to be added:</h5>
            <div className="form__display">
				<b>Name: <span>{this.state.name}</span></b>
            </div>
            <div className="form__display">
				<b>Phone: <span>{this.state.phone}</span></b>
            </div>
            <button type="submit" className="btn btn-success">
              ADD
            </button>
          </form>
        </div>
      </Fragment>
    );
  }
}

class Main extends Component {
	render() {
		return (
			  <div className="Main">
				<Header>PHONE DIRECTORY</Header>
				<div className="Main__container">
				  <Link to="/add" className="btn btn-success">
					ADD
				  </Link>
				  <Contacts
					list={this.props.contacts}
					onDelete={this.props.deleteContact}
				  />
				</div>
			  </div>
			);
	}
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: []
    };
  }
  addContact = contact => {
    const { name, phone } = contact;
    const newContacts = [...this.state.contacts];
    newContacts.push({ name, phone, id: newContacts.length + 1 });
    this.setState(
      {
        contacts: newContacts
      },
      () => {
        this.props.history.push("/");
      }
    );
  };
  deleteContact = id => {
    const newContacts = this.state.contacts.filter(
      contact => contact.id !== id
    );
    this.setState({
      contacts: newContacts
    });
  };
  render() {
    return (
      <Switch>
        <Route
          path="/add"
          render={() => <AddContact addContact={this.addContact} />}
        />
        <Route
          path="/"
          render={() => (
            <Main
              contacts={this.state.contacts}
              deleteContact={this.deleteContact}
            />
          )}
        />
      </Switch>
    );
  }
}

export default withRouter(App);