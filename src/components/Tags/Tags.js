import { Fragment } from "react";
import './Tags.scss'

const Tags = (props) =>{
    const isLeft = props.side === "left" ? true : false;
    const imgPath = props.imgpath
    const mainTopic = props.maintopic;
    const desc = props.desc;
    if(isLeft){
        return(
            <Fragment>
                <div className="w-100 tag-container">
                    <div className="row d-flex align-items-center justify-content-center m-5">
                        <div className="col col-6 d-grid gap-4">
                            <h2 className="top-line">{mainTopic}</h2>
                            <p>{desc}</p>
                            <button className="button-learn-more">LEARN MORE</button>
                        </div>
                        <div className="col col-6">
                            <img src={imgPath} alt="Alt Img"></img>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    } else if (!isLeft){
        return(
            <Fragment>
                 <div className="w-100 tag-container">
                    <div className="row d-flex align-items-center justify-content-center m-5">
                        <div className="col col-6">
                            <img src={imgPath} alt="Alt Img"></img>
                        </div>
                        <div className="col col-6 d-grid gap-4 ps-5">
                            <h2 className="top-line">{mainTopic}</h2>
                            <p>{desc}</p>
                            <button className="button-learn-more">LEARN MORE</button>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Tags;