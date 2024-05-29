// import './styles/App.css'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
// import { createFile } from 'xlsx';
import {saveAs} from 'file-saver';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";
import SignIn from '../signin/signIn';
const Upload = () => {
  const [excelData, setExcelData] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // function handleUpload() {
  //   const workbook = createFile({ Sheets: {}, SheetNames: [] });
  //   const excelFile = new Blob([workbook], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  //   saveAs(excelFile, 'empty-file.xlsx');
  // }
  const handleLogout = () => {

    dispatch(logout());
    navigate('/');

  };
  return (
<>
            {!currentUser ? (
                <SignIn />
            ) : (

              <div>
                <div className="login-content">
                  <button id='logout' type="submit" className='btn' onClick={handleLogout}>Logout</button><br />
                  <div className="form">
                    <p className='text'>Welcome to Loom Genie.</p>
                    <button type="submit" className='btn' >UPLOAD</button><br />
                  </div>
                  <img src="./src/assets/logi.png" alt="" className='images' />
                </div>
              </div>
                
            )}
        </>

  )
}

export default Upload;