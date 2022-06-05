import React, {useContext, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {GlobalContext} from "../components/GlobalProvider";
import PatronFondo from '../assets/images/patron_fondo.png';
import Card from "../components/Card";
import CompanyIconTest from '../assets/images/icons/company_icon_test.png';

function Home() {
    //const user = JSON.parse(localStorage.getItem('user'));
    const {user, getUser} = useContext(GlobalContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!getUser) navigate('/login')
    }, [getUser, navigate, user])

    const style = {
        background: {
            backgroundImage: `url(${PatronFondo})`,
        },
        container: {
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 0 50px 0 rgba(0,0,0,0.2)',
            padding: "100px 20px",
            position: 'relative',
            width: '1000px',
        },
        content: {
            margin: "0 auto",
            display: 'flex',
            flexDirection: 'row',
        },
        splitLine: {
            height: "95vh",
            border: "none",
            borderLeft: "1px solid #A6A6A6",
            width: "1px",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
        }
    }

    return (
        <div style={style.background} className="w-full h-full bg-gray">
            <div style={style.container} className={"h-full bg-slate-50"}>
                <div style={style.content} className={"h-full w-full text-center"}>
                    <div className="basis-1/2 flex flex-col gap-y-2">
                        <Card isActive={true}
                              icon={CompanyIconTest}
                              title={"Titulo de Empleo"}
                              description={"Lorem ipsum dolor sit amet, consectetur \n" +
                                  "adipiscing elit."}
                              optional={{
                                  date: "20/01/2021",
                                  status: "active",
                                  counter: {
                                      title: "Solicitudes",
                                      count: "10"
                                  }
                              }}
                        />
                        <Card isActive={true}
                              icon={CompanyIconTest}
                              title={"Titulo de Empleo"}
                              description={"Lorem ipsum dolor sit amet, consectetur \n" +
                                  "adipiscing elit."}
                              optional={{
                                  date: "20/01/2021",
                                  status: "active",
                                  counter: {
                                      title: "Solicitudes",
                                      count: "10"
                                  }
                              }}
                        />
                    </div>
                    <hr style={style.splitLine} />
                    <div className="basis-1/2">2</div>
                </div>
            </div>
        </div>
    );
}

export default Home;