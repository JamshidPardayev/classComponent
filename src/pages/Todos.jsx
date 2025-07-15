import React, { Component } from "react";
import backImg from "../assets/img2.jpg";
export default class Todos extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      surname: "",
      phone: "",
      email: "",
      password: "",
      data: [],
      isOpen: false,
      update: null,
    };
  }
  componentDidMount() {
    const storedData = localStorage.getItem("todosData");
    if (storedData) {
      this.setState({ data: JSON.parse(storedData) });
    }
  }

  saveToLocalStorage = (data) => {
    localStorage.setItem("todosData", JSON.stringify(data));
  };

  handleToggle = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { name, surname, phone, email, password } = this.state;

    const trimName = name.trim();
    const trimSurname = surname.trim();
    const trimPhone = phone.trim();
    const trimEmail = email.trim();
    const trimPassword = password.trim();

    if (
      !trimName ||
      !trimSurname ||
      !trimPhone ||
      !trimEmail ||
      !trimPassword
    ) {
      alert("Barcha maydonlarni to'ldiring!");
      return;
    }
    let newData;
    if (this.state.update) {
      newData = this.state.data?.map((item) =>
        item.id === this.state.update
          ? { ...item, name, surname, phone, email, password }
          : item
      );
    } else {
      const newTodo = {
        id: Date.now(),
        name: this.state.name,
        surname: this.state.surname,
        phone: this.state.phone,
        email: this.state.email,
        password: this.state.password,
      };
      newData = [...this.state.data, newTodo];
    }
    this.saveToLocalStorage(newData);
    this.setState({
      data: newData,
      name: "",
      surname: "",
      phone: "",
      email: "",
      password: "",
      isOpen: false,
      update: null,
    });
  };

  handleDelete = (id) => {
    const filtered = this.state.data.filter((item) => item.id !== id);
    this.setState({
      data: filtered,
    });
    this.saveToLocalStorage(filtered);
  };
  handleReset = () => {
    this.setState({
      name: "",
      surname: "",
      phone: "",
      email: "",
      password: "",
    });
  };
  handleUpdate = (item) => {
    this.setState({
      name: item?.name,
      surname: item?.surname,
      phone: item?.phone,
      email: item?.email,
      password: item?.password,
      isOpen: true,
      update: item?.id,
    });
  };
  render() {
    return (
      <div className=" min-h-[100vh] bg-gray-50 py-6 mx-auto px-3 ">
        <button
          onClick={this.handleToggle}
          className="w-[200px] h-[40px] rounded bg-gray-600 hover:bg-gray-800 duration-300 cursor-pointer flex justify-center items-center mx-auto text-white mb-5"
        >
          {this.state.isOpen ? "Close Form" : "Open Form"}
        </button>
        {this.state.isOpen && (
          <form
            onSubmit={this.handleSubmit}
            action=""
            className="relative top-0 duration-300 left-1/2 transform -translate-x-1/2 flex flex-col gap-4 max-w-[600px] w-full p-3 rounded-[10px]"
            style={{
              backgroundImage: `url(${backImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h2 className="text-[30px] font-semibold text-center text-gray-950">
              Create Form
            </h2>
            <input
              type="text"
              placeholder="Enter Your Name"
              className="border-none bg-white outline-none h-[40px] rounded-[6px] px-3 text-black font-medium"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Enter Your Surname"
              className="border-none bg-white outline-none h-[40px] rounded-[6px] px-3 text-black font-medium"
              value={this.state.surname}
              onChange={(e) => this.setState({ surname: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Enter Your Phone"
              className="border-none bg-white outline-none h-[40px] rounded-[6px] px-3 text-black font-medium"
              value={this.state.phone}
              onChange={(e) => this.setState({ phone: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Enter Your Email"
              className="border-none bg-white outline-none h-[40px] rounded-[6px] px-3 text-black font-medium"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Enter Your Password"
              className="border-none bg-white outline-none h-[40px] rounded-[6px] px-3 text-black font-medium"
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
              required
            />
            <div className="flex gap-3">
              <button
                onClick={() => this.handleReset()}
                type="button"
                className="h-[40px] text-white font-medium w-full bg-red-500 cursor-pointer hover:bg-red-600 duration-300 rounded-[6px]"
              >
                Reset
              </button>
              <button className="h-[40px] text-white font-medium w-full bg-green-500 cursor-pointer hover:bg-green-600 duration-300 rounded-[6px]">
                {this.state.update ? "Update" : "Send"}
              </button>
            </div>
          </form>
        )}

        <div className="overflow-x-auto">
          <table className="mt-10 border-collapse w-full max-w-5xl mx-auto text-center shadow-lg rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="border px-4 py-3">Full Name</th>
                <th className="border px-4 py-3">Phone</th>
                <th className="border px-4 py-3">Email</th>
                <th className="border px-4 py-3">Password</th>
                <th className="border px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data?.map((item, index) => (
                <tr
                  key={item?.id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-200"}
                >
                  <td className="border border-white px-4 py-2 min-w-[220px]">
                    {item?.name} {item?.surname}
                  </td>
                  <td className="border border-white px-4 py-2">
                    {item?.phone}
                  </td>
                  <td className="border border-white px-4 py-2">
                    {item?.email}
                  </td>
                  <td className="border border-white px-4 py-2">
                    {item?.password}
                  </td>
                  <td className="border border-white px-2 py-2 min-w-[180px]">
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md duration-200"
                      onClick={() => this.handleUpdate(item)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md duration-200 ml-1"
                      onClick={() => this.handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
