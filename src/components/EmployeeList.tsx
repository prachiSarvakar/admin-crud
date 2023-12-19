import { useState } from "react";
import "./EmployeeList.style.css";
import EmployeeModal from "./EmployeeModal";
import { IEmployee } from "./Home";

type Props = {
  list: IEmployee[];
  handleDeleteEmpRecord: (data: IEmployee) => void;
  editRecord: (data: IEmployee) => void;
};

const EmployeeList = (props: Props) => {
  //destructure list from the props
  const { list, handleDeleteEmpRecord, editRecord } = props;
  const [showModal, setShowModal] = useState(false);
  const [showList, setShowList] = useState({} as IEmployee);

  const viewRecord = (data: IEmployee) => {
    setShowList(data);
    setShowModal(true);
  };
  const onCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <article>
        <h3 className="emp-list-header">Employee List</h3>
      </article>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile Number</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list?.length > 0 &&
            list
              .sort((a, b) => a.lastName.localeCompare(b.lastName))
              ?.map((i) => (
                <tr key={i.id}>
                  <td>
                    {i.firstName}
                    {i.lastName}
                  </td>
                  <td>{i.phoneNumber}</td>
                  <td>{i.email}</td>
                  <td>
                    <div className="btn-styles">
                      <input type="button" value="View" onClick={() => viewRecord(i)} />
                      <input type="button" value="Edit" onClick={() => editRecord(i)} />
                      <input type="button" value="Delete" onClick={() => handleDeleteEmpRecord(i)} />
                    </div>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
      {showModal && showList !== null && <EmployeeModal onClosehandle={onCloseModal} data={showList} />}
    </div>
  );
};
export default EmployeeList;
