import React, { Component } from 'react'

import PlantIcon from './icon/planticon.png'
import HerbMedIcon from './icon/herbmedicon.png'
import CompanyIcon from './icon/companyicon.png'
import CompoundIcon from './icon/compoundicon.png'
import CrudeIcon from './icon/crudeicon.png'
import DClassIcon from './icon/dclassicon.png'
import EthnicIcon from './icon/ethnicicon.png'
import ExplicitIcon from './icon/expliciticon.png'
import MedTypeIcon from './icon/medtypeicon.png'
import PlantethnicIcon from './icon/plantethnicicon.png'
import TacitIcon from './icon/taciticon.png'
import color from '@material-ui/core/colors/grey';

class Landing extends Component {
    render (){
        return (
            <div>
                <div style={{
                        width: "90%",
                        margin: "auto",
                        marginTop: "20px",
                        marginBottom: "20px",
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(13rem, 1fr))",
                        gridGap: "2rem",
                        }}>
                    <div style={{
                        backgroundImage: "linear-gradient(0deg,#3f51b5,#7684cf)",
                        height: "100px",
                        boxSizing: "border-box",
                        boxShadow: "0 2px 5px 0 rgba(0,0,0,.26)",
                        padding: "30px",
                        border: "0",
                        borderRadius: "0.375rem",
                        color:"white",
                        display: "flex"
                    }}>
                         <img style={{
                            width: "40px",
                            height: "40px",
                            margin: "0"
                            }} src={EthnicIcon} />
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems:"center",
                                width: "80%"
                            }}> 
                                <h6 style={{
                                    margin: "0"
                                }}> Ethnic </h6>
                                <h1 style={{
                                    margin: "0"
                                }}> 19 </h1>
                            </div>
                            
                    </div>

                    <div style={{
                        backgroundColor: "#00bcd4",
                        height: "100px",
                        boxSizing: "border-box",
                        boxShadow: "0 2px 5px 0 rgba(0,0,0,.26)",
                        padding: "30px",
                        border: "0",
                        borderRadius: "0.375rem",
                        color:"white",
                        display: "flex"
                    }}>
                         <img style={{
                            width: "40px",
                            height: "40px",
                            margin: "0"
                            }} src={PlantethnicIcon} />
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems:"center",
                                width: "80%"
                            }}> 
                                <h6 style={{
                                    margin: "0"
                                }}> Plant Ethnic </h6>
                                <h1 style={{
                                    margin: "0"
                                }}> 19 </h1>
                            </div>
                    </div>

                    <div style={{
                        backgroundColor: "#ff4081",
                        height: "100px",
                        boxSizing: "border-box",
                        boxShadow: "0 2px 5px 0 rgba(0,0,0,.26)",
                        padding: "30px",
                        border: "0",
                        borderRadius: "0.375rem",
                        color:"white",
                        display: "flex"
                    }}>
                         <img style={{
                            width: "40px",
                            height: "40px",
                            margin: "0"
                            }} src={CompanyIcon} />
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems:"center",
                                width: "80%"
                            }}> 
                                <h6 style={{
                                    margin: "0"
                                }}> Company </h6>
                                <h1 style={{
                                    margin: "0"
                                }}> 19 </h1>
                            </div>
                    </div>
                    <div style={{
                         backgroundColor: "#ff9800",
                        height: "100px",
                        boxSizing: "border-box",
                        boxShadow: "0 2px 5px 0 rgba(0,0,0,.26)",
                        padding: "30px",
                        border: "0",
                        borderRadius: "0.375rem",color:"white",
                        display: "flex"
                    }}>
                         <img style={{
                            width: "40px",
                            height: "40px",
                            margin: "0"
                            }} src={DClassIcon} />
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems:"center",
                                width: "80%"
                            }}> 
                                <h6 style={{
                                    margin: "0"
                                }}> DClass </h6>
                                <h1 style={{
                                    margin: "0"
                                }}> 19 </h1>
                            </div>
                    </div>

                    <div style={{
                        backgroundColor: "#20c997",
                        height: "100px",
                        boxSizing: "border-box",
                        boxShadow: "0 2px 5px 0 rgba(0,0,0,.26)",
                        padding: "30px",
                        border: "0",
                        borderRadius: "0.375rem",color:"white",
                        display: "flex"
                    }}>
                         <img style={{
                            width: "40px",
                            height: "40px",
                            margin: "0"
                            }} src={MedTypeIcon} />
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems:"center",
                                width: "80%"
                            }}> 
                                <h6 style={{
                                    margin: "0"
                                }}> Medicine Type </h6>
                                <h1 style={{
                                    margin: "0"
                                }}> 19 </h1>
                            </div>
                    </div>

                    <div style={{
                        backgroundColor: "#dc3545",
                        height: "100px",
                        boxSizing: "border-box",
                        boxShadow: "0 2px 5px 0 rgba(0,0,0,.26)",
                        padding: "30px",
                        border: "0",
                        borderRadius: "0.375rem",color:"white",
                        display: "flex"
                    }}>
                         <img style={{
                            width: "40px",
                            height: "40px",
                            margin: "0"
                            }} src={CrudeIcon} />
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems:"center",
                                width: "80%"
                            }}> 
                                <h6 style={{
                                    margin: "0"
                                }}> Crude Drug </h6>
                                <h1 style={{
                                    margin: "0"
                                }}> 19 </h1>
                            </div>
                    </div>

                    <div style={{
                        backgroundImage: "linear-gradient(90deg,#aa3c6d 0,#ff9800)",
                        height: "100px",
                        boxSizing: "border-box",
                        boxShadow: "0 2px 5px 0 rgba(0,0,0,.26)",
                        padding: "30px",
                        border: "0",
                        borderRadius: "0.375rem",
                        color:"white",
                        display: "flex"
                    }}>
                         <img style={{
                            width: "40px",
                            height: "40px",
                            margin: "0"
                            }} src={TacitIcon} />
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems:"center",
                                width: "80%"
                            }}> 
                                <h6 style={{
                                    margin: "0"
                                }}> Tacit Knowledge </h6>
                                <h1 style={{
                                    margin: "0"
                                }}> 19 </h1>
                            </div>
                    </div>

                    <div style={{
                        backgroundImage: "linear-gradient(90deg,#3f51b5 0,#e91e63)",
                        backgroundColor: "#007bff",
                        height: "100px",
                        boxSizing: "border-box",
                        boxShadow: "0 2px 5px 0 rgba(0,0,0,.26)",
                        padding: "30px",
                        border: "0",
                        borderRadius: "0.375rem",color:"white",
                        display: "flex"
                    }}>
                         <img style={{
                            width: "40px",
                            height: "40px",
                            margin: "0"
                            }} src={ExplicitIcon} />
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems:"center",
                                width: "80%"
                            }}> 
                                <h6 style={{
                                    margin: "0"
                                }}> Explicit Knowledge </h6>
                                <h1 style={{
                                    margin: "0"
                                }}> 19 </h1>
                            </div>
                    </div>
                    
                </div>

                <div style={{
                        width: "90%",
                        margin: "auto",
                        marginTop: "20px",
                        marginBottom: "20px",
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 1fr))",
                        gridGap: "2rem",
                        }}>
                    <div style={{
                        height: "350px",
                        boxSizing: "border-box",
                        backgroundColor: "#fff",
                        padding: "30px",
                        border: "0",
                        borderRadius: "0.375rem",
                        boxShadow: "0 2px 5px 0 rgba(0,0,0,.26)",
                        display: "flex",
                        flexDirection:"column"
                        
                    }}>
                        <div style={{
                            display:"flex",
                            justifyContent :"center"
                        }}>
                        <img style={{
                            width: "40px",
                            height: "40px",
                            margin: "0"
                            }} src={HerbMedIcon} />
                        <h2 style={{
                            margin: "0 10px"
                        }}> Herbal Medicine</h2>
                        </div>
                        <div style={{
                            display:"flex",
                            justifyContent :"center"
                        }}>
                            <span 
                                style={{
                                    fontSize: "150px"
                                }}
                            >
                                90
                            </span>
                        </div>
                        
                    </div>

                    <div style={{
                        height: "350px",
                        boxSizing: "border-box",
                        backgroundColor: "#fff",
                        padding: "30px",
                        border: "0",
                        borderRadius: "0.375rem",
                        boxShadow: "0 2px 5px 0 rgba(0,0,0,.26)",
                        display: "flex",
                        flexDirection:"column"
                        
                    }}>
                        <div style={{
                            display:"flex",
                            justifyContent :"center"
                        }}>
                        <img style={{
                            width: "40px",
                            height: "40px",
                            margin: "0"
                            }} src={PlantIcon} />
                        <h2 style={{
                            margin: "0 10px"
                        }}> Plant</h2>
                        </div>
                        <div style={{
                            display:"flex",
                            justifyContent :"center"
                        }}>
                            <span 
                                style={{
                                    fontSize: "150px"
                                }}
                            >
                                90
                            </span>
                        </div>
                    </div>

                    <div style={{
                        height: "350px",
                        boxSizing: "border-box",
                        backgroundColor: "#fff",
                        padding: "30px",
                        border: "0",
                        borderRadius: "0.375rem",
                        boxShadow: "0 2px 5px 0 rgba(0,0,0,.26)",
                        display: "flex",
                        flexDirection:"column"
                        
                    }}>
                        <div style={{
                            display:"flex",
                            justifyContent :"center"
                        }}>
                            <img style={{
                                width: "40px",
                                height: "40px",
                                margin: "0"
                                }} src={CompoundIcon} />
                            <h2 style={{
                                margin: "0 10px"
                            }}> Compound </h2>
                        </div>
                        <div style={{
                            display:"flex",
                            justifyContent :"center"
                        }}>
                            <span 
                                style={{
                                    fontSize: "150px"
                                }}
                            >
                                90
                            </span>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default Landing;