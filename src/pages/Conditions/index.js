import { useEffect, useState } from "react";
import "./static_page.scss"

function StaticPage() {
    const modeAt = ["Automatic", "Schedule", "Manual"];
    const staticAt = ["High", "Normal", "Low"];

    const [temp, setTemp] = useState(28);
    const [modeTemp, setModeTemp] = useState("Automatic");
    const [staticTemp, setStaticTemp] = useState("Normal");

    const [light, setLight] = useState(170);
    const [modeLight, setModeLight] = useState("Automatic");
    const [staticLight, setStaticLight] = useState("Normal");

    const [irrig, setIrrig] = useState(56);
    const [modeIrrig, setModeIrrig] = useState("Automatic");
    const [staticIrrig, setStaticIrrig] = useState("Normal");

    useEffect(() => {
        if (temp < 21) {
            setStaticTemp(staticAt[2])
        }
        else if (temp >= 21 && temp <= 24) {
            setStaticTemp(staticAt[1])
        }
        else {
            setStaticTemp(staticAt[0])}

        if (irrig < 60) {
            setStaticIrrig(staticAt[2])
        }
        else if (irrig >= 60 && irrig <= 70) {
            setStaticIrrig(staticAt[1])
        }
        else {
            setStaticIrrig(staticAt[0])}
        
    }, [])

    return (
        <div className="static-page">
            <div className="condition d-flex mb-4">
                <div className="col-5">
                    <div className="d-flex flex-column p-4 left-info">
                        <div className="title">
                            <div className="day">Sunday</div>
                            <div>
                                12, March, 2023 <br></br>
                                Tomato Garden
                            </div>
                        </div>
                        <div className="icon">
                            <i class="uil uil-sun"></i>
                        </div>
                        <div className="value">{temp}<i class="uil uil-celsius"></i></div>
                        <div className="static">
                            {staticTemp}
                        </div>
                    </div>
                </div>
                <div className="col-7">
                    <div className="d-flex flex-column right-info">
                        <div className="title">
                            <div className="text-center">
                                <h2>TEMPERATOR</h2>
                            </div>
                            <div className="attribute">
                                Mode : 
                                <span> {modeTemp} </span>
                            </div>
                            <div className="attribute">
                                Static : 
                                <span> {staticTemp}</span>
                                {staticTemp !== "Normal" && (
                                    <span>(Need to keep from 21 to 24)</span>
                                )}
                            </div>
                        </div>
                        <div className="btn-area text-center">
                            <div className="btn-change mb-3">
                                <span>MEASURE</span>
                            </div>
                            <div className="btn-change">
                                <span>SETTING</span>
                            </div>
                        </div >
                    </div>
                </div>
            </div>

            <div className="condition d-flex mb-4" style={{backgroundColor: "var(--black-blue)"}}>
                <div className="col-5">
                    <div className="d-flex flex-column p-4 left-info" style={{backgroundColor: "var(--blue)"}}>
                        <div className="title">
                            <div className="day">Sunday</div>
                            <div>
                                12, March, 2023 <br></br>
                                Tomato Garden
                            </div>
                        </div>
                        <div className="icon">
                        <i class="uil uil-brightness-half"></i>
                        </div>
                        <div className="value">
                            {light} 
                            <span> W/m<sup>2</sup></span>
                        </div>
                        <div className="static">
                            {   }
                        </div>
                    </div>
                </div>
                <div className="col-7">
                    <div className="d-flex flex-column right-info">
                        <div className="title">
                            <div className="text-center">
                                <h2>LIGHTING</h2>
                            </div>
                            <div className="attribute">
                                Mode : 
                                <span> {modeLight} </span>
                            </div>
                            <div className="attribute">
                                Static : 
                                <span> {staticLight} </span>
                                {staticLight !== "Normal" && (
                                    <span>(Need to keep from 21 to 24)</span>
                                )}
                            </div>
                        </div>
                        <div className="btn-area text-center">
                            <div className="btn-change mb-3">
                                <span>MEASURE</span>
                            </div>
                            <div className="btn-change">
                                <span>SETTING</span>
                            </div>
                        </div >
                    </div>
                </div>
            </div>
            
            <div className="condition d-flex mb-4" style={{backgroundColor: "var(--black-green)"}}>
                <div className="col-5">
                    <div className="d-flex flex-column p-4 left-info" style={{backgroundColor: "var(--green-dark)"}}>
                        <div className="title">
                            <div className="day">Sunday</div>
                            <div>
                                12, March, 2023 <br></br>
                                Tomato Garden
                            </div>
                        </div>
                        <div className="icon">
                        <i class="uil uil-tear"></i>
                        </div>
                        <div className="value">{irrig}%</div>
                        <div className="static">
                            {staticIrrig}
                        </div>
                    </div>
                </div>
                <div className="col-7">
                    <div className="d-flex flex-column right-info">
                        <div className="title">
                            <div className="text-center">
                                <h2>IRRIGATION</h2>
                            </div>
                            <div className="attribute">
                                Mode : 
                                <span> {modeIrrig} </span>
                            </div>
                            <div className="attribute">
                                Static : 
                                <span> {staticIrrig} </span>
                                {staticIrrig !== "Normal" && (
                                    <span>(Need to keep from 21 to 24)</span>
                                )}
                            </div>
                        </div>
                        <div className="btn-area text-center">
                            <div className="btn-change mb-3">
                                <span>MEASURE</span>
                            </div>
                            <div className="btn-change">
                                <span>SETTING</span>
                            </div>
                        </div >
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StaticPage;