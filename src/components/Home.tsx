import { useEffect, useState } from "react";
import "./Home.style.css";
import EmployeeList from "./EmployeeList";
import AddEmployeeForm from "./AddEmployeeForm";
import EditEmployeeDetails from "./EditEmploteeDetails";

export interface IEmployee {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

export enum pageEnum {
  list,
  add,
  edit,
}

const Home = () => {
  const [empList, setEmpList] = useState<IEmployee[]>([]);
  const [shownPage, setShownPage] = useState(pageEnum.list);
  const [dataToEdit, setDataToEdit] = useState({} as IEmployee);

  useEffect(() => {
    const listFromStorage = window.localStorage.getItem("EmployeeList");
    if (listFromStorage) {
      _setEmpList(JSON.parse(listFromStorage));
    }
  }, []);

  const handleAddPage = () => {
    setShownPage(pageEnum.add);
  };
  const handleBackToListPage = () => {
    setShownPage(pageEnum.list);
  };

  const addEmployee = (data: IEmployee) => {
    _setEmpList([...empList, data]);
  };

  const deleteEmployee = (data: IEmployee) => {
    const findIndexOfData = empList?.indexOf(data);
    const tempList = [...empList];

    tempList.splice(findIndexOfData, 1);
    _setEmpList(tempList);
  };
  const editDetails = (data: IEmployee) => {
    setShownPage(pageEnum.edit);
    setDataToEdit(data);
  };

  const updatedata = (data: IEmployee) => {
    const filteredData = empList?.filter((i) => i.id === data.id)[0];
    const indexOfRow = empList?.indexOf(filteredData);
    const tempData = [...empList];
    tempData[indexOfRow] = data;
    _setEmpList(tempData);
  };

  const _setEmpList = (list: IEmployee[]) => {
    setEmpList(list);
    window.localStorage.setItem("EmployeeList", JSON.stringify(list));
  };

  return (
    <>
      <article className="article-header ">
        <header>
          <h1>React Admin Panel</h1>
        </header>
      </article>

      <section className="section-content">
        {shownPage === pageEnum.list ? (
          <>
            <input type="button" value="Add Employee" className="add-emp-btn" onClick={handleAddPage} />
            <EmployeeList list={empList} handleDeleteEmpRecord={deleteEmployee} editRecord={editDetails} />
          </>
        ) : shownPage === pageEnum.add ? (
          <>
            <AddEmployeeForm onbtnClickhandler={handleBackToListPage} handleSubmit={addEmployee} />
          </>
        ) : (
          shownPage === pageEnum.edit && (
            <>
              <EditEmployeeDetails
                data={dataToEdit}
                onbtnClickhandler={handleBackToListPage}
                onUpdateData={updatedata}
              />
            </>
          )
        )}
      </section>
    </>
  );
};
export default Home;
