import { useState } from "react";
import { IEmployee } from "./Home";
import "./AddEmployeeForm.style.css";

type Props = {
  data: IEmployee;
  onbtnClickhandler: () => void;
  onUpdateData: (data: IEmployee) => void;
};

const EditEmployeeDetails = (props: Props) => {
  const { data, onbtnClickhandler, onUpdateData } = props;
  const [firstName, setFirstName] = useState(data.firstName);
  const [lastName, setLastName] = useState(data.lastName);
  const [mobileNumber, setMobileNumber] = useState(data.phoneNumber);
  const [email, setEmail] = useState(data.email);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateName = (value: string) => {
    const regex = /^[a-zA-Z]{3,}$/; // Minimum 3 characters for the name
    return regex.test(value);
  };

  const validateMobileNumber = (value: string) => {
    const regex = /^[0-9]{9}$/; // Exactly 9 digits for the mobile number
    return regex.test(value);
  };

  const validateEmail = (value: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation
    return regex.test(value);
  };

  const handleSubmitData = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    // Validate name
    if (!validateName(firstName)) {
      newErrors.firstName = "Invalid name (minimum 3 characters required)";
    }

    // Validate last name
    if (!validateName(lastName)) {
      newErrors.lastName = "Invalid last name (minimum 3 characters required)";
    }

    // Validate mobile number
    if (!validateMobileNumber(mobileNumber)) {
      newErrors.mobileNumber = "Invalid mobile number (exactly 9 digits required)";
    }

    // Validate email
    if (!validateEmail(email)) {
      newErrors.email = "Invalid email";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const updatedData: IEmployee = {
        id: data.id,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: mobileNumber,
        email: email,
      };
      onUpdateData(updatedData);
      onbtnClickhandler();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmitData}>
        <div className="form-group">
          <div>
            <label>
              First Name<span className="required">*</span>:
            </label>
          </div>
          <div>
            <input type="text" id="name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            {errors.firstName && <span className="error">{errors.firstName}</span>}
          </div>
        </div>
        <div className="form-group">
          <div>
            <label>
              Last Name<span className="required">*</span>:
            </label>
          </div>
          <div>
            <input type="text" id="name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            {errors.lastName && <span className="error">{errors.lastName}</span>}
          </div>
        </div>
        <div className="form-group">
          <div>
            <label htmlFor="mobileNumber">
              Mobile Number<span className="required">*</span>:
            </label>
          </div>
          <div>
            <input
              type="text"
              id="mobileNumber"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
            {errors.mobileNumber && <span className="error">{errors.mobileNumber}</span>}
          </div>
        </div>
        <div className="form-group">
          <div>
            <label htmlFor="email">
              Email<span className="required">*</span>:
            </label>
          </div>
          <div>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
        </div>
        <div className="form-group">
          <div className="btn-style">
            <div>
              <input type="button" value="Back" onClick={onbtnClickhandler} />
            </div>
            <div className="add-emp-btn">
              <input type="submit" value="Update Employee" />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditEmployeeDetails;
