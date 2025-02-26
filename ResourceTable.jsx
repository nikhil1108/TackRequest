import React, { Component } from "react";
import './AllocationTable.css'; // Import the CSS file

class AllocationTable extends Component {
  // Constructor to initialize individual fields in state
  constructor(props) {
    super(props);

    // Initialize state with individual fields for each resource
    this.state = {
      cpuSku: "",
      ramSku: "NO SKU", // Default value for RAM SKU
      disk1Sku: "",
      disk2Sku: "",
      disk3Sku: "",
      otherSku: "",

      cpuCurrentAllocation: "",
      ramCurrentAllocation: "",
      disk1CurrentAllocation: "",
      disk2CurrentAllocation: "",
      disk3CurrentAllocation: "",
      otherCurrentAllocation: "",

      cpuNewAllocation: "",
      ramNewAllocation: "",
      disk1NewAllocation: "",
      disk2NewAllocation: "",
      disk3NewAllocation: "",
      otherNewAllocation: "",
    };
  }

  // Handle input changes and update the corresponding state variable
  handleInputChange = (field, value) => {
    this.setState({
      [field]: value, // Dynamically update the state field based on the input name
    });
  };

  // Handle form submission and log the JSON data
  handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Collect the data into an object and log it as JSON
    const requestData = {
      cpuSku: this.state.cpuSku,
      ramSku: this.state.ramSku,
      disk1Sku: this.state.disk1Sku,
      disk2Sku: this.state.disk2Sku,
      disk3Sku: this.state.disk3Sku,
      otherSku: this.state.otherSku,

      cpuCurrentAllocation: this.state.cpuCurrentAllocation,
      ramCurrentAllocation: this.state.ramCurrentAllocation,
      disk1CurrentAllocation: this.state.disk1CurrentAllocation,
      disk2CurrentAllocation: this.state.disk2CurrentAllocation,
      disk3CurrentAllocation: this.state.disk3CurrentAllocation,
      otherCurrentAllocation: this.state.otherCurrentAllocation,

      cpuNewAllocation: this.state.cpuNewAllocation,
      ramNewAllocation: this.state.ramNewAllocation,
      disk1NewAllocation: this.state.disk1NewAllocation,
      disk2NewAllocation: this.state.disk2NewAllocation,
      disk3NewAllocation: this.state.disk3NewAllocation,
      otherNewAllocation: this.state.otherNewAllocation,
    };

    // Logging the request data as JSON
    console.log(JSON.stringify(requestData, null, 2));
    alert("Form submitted! Check the console for the JSON data.");
  };

  render() {
    return (
      <div className="allocation-table">
        <h2>Resource Allocation Table</h2>
        <form onSubmit={this.handleSubmit}>
          <table>
            <thead>
              <tr>
                <th>Resource</th>
                <th>SKU</th>
                <th>Current Allocation</th>
                <th>New Total Allocation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CPU (number of cores)</td>
                <td>
                  <select
                    value={this.state.cpuSku}
                    onChange={(e) => this.handleInputChange("cpuSku", e.target.value)}
                  >
                    <option value="SKU1">SKU 1</option>
                    <option value="SKU2">SKU 2</option>
                    <option value="SKU3">SKU 3</option>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    value={this.state.cpuCurrentAllocation}
                    onChange={(e) => this.handleInputChange("cpuCurrentAllocation", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={this.state.cpuNewAllocation}
                    onChange={(e) => this.handleInputChange("cpuNewAllocation", e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>RAM (in GB)</td>
                <td>
                  <input
                    type="text"
                    value={this.state.ramSku}
                    disabled
                    readOnly
                    className="disabled-input"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={this.state.ramCurrentAllocation}
                    onChange={(e) => this.handleInputChange("ramCurrentAllocation", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={this.state.ramNewAllocation}
                    onChange={(e) => this.handleInputChange("ramNewAllocation", e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>Disk Type 1 (in GB)</td>
                <td>
                  <input
                    type="text"
                    value={this.state.disk1Sku}
                    onChange={(e) => this.handleInputChange("disk1Sku", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={this.state.disk1CurrentAllocation}
                    onChange={(e) => this.handleInputChange("disk1CurrentAllocation", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={this.state.disk1NewAllocation}
                    onChange={(e) => this.handleInputChange("disk1NewAllocation", e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>Disk Type 2 (in GB)</td>
                <td>
                  <input
                    type="text"
                    value={this.state.disk2Sku}
                    onChange={(e) => this.handleInputChange("disk2Sku", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={this.state.disk2CurrentAllocation}
                    onChange={(e) => this.handleInputChange("disk2CurrentAllocation", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={this.state.disk2NewAllocation}
                    onChange={(e) => this.handleInputChange("disk2NewAllocation", e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>Disk Type 3 (in GB)</td>
                <td>
                  <input
                    type="text"
                    value={this.state.disk3Sku}
                    onChange={(e) => this.handleInputChange("disk3Sku", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={this.state.disk3CurrentAllocation}
                    onChange={(e) => this.handleInputChange("disk3CurrentAllocation", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={this.state.disk3NewAllocation}
                    onChange={(e) => this.handleInputChange("disk3NewAllocation", e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>Other</td>
                <td>
                  <input
                    type="text"
                    value={this.state.otherSku}
                    onChange={(e) => this.handleInputChange("otherSku", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={this.state.otherCurrentAllocation}
                    onChange={(e) => this.handleInputChange("otherCurrentAllocation", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={this.state.otherNewAllocation}
                    onChange={(e) => this.handleInputChange("otherNewAllocation", e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="submit-container">
            <button
              type="submit"
              className="submit-button"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AllocationTable;
