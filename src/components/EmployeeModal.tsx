import "./EmployeeModal.style.css";
import { IEmployee } from "./Home";

type Props = {
  onClosehandle: () => void;
  data: IEmployee;
};
const EmployeeModal = (props: Props) => {
  const { onClosehandle, data } = props;
  return (
    <>
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClosehandle}>
            &times;
          </span>
          <div>
            <h3>Employee Details</h3>
            <div>
              <div>
                <label>Name: {data.firstName + " " + data.lastName}</label>
              </div>
              <div>
                <label>Name: {data.phoneNumber}</label>
              </div>
              <div>
                <label>Name: {data.email}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EmployeeModal;
