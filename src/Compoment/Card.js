import {useState} from "react";
import {Button} from "antd";
import './Card.css'
const contentStyle = {
    height: '300px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: 'black',
    width:'400px',
    borderRadius:"25px",
    marginLeft:"100px"
};
const strategies = [
    {
        name: 'The Italian Game',
        description: 'The Italian game begins with 1.e4 e5 2.Nf3 Nc6 3.Bc4. ',
        image: 'strategy-theitaliangame.png'
    },
    {
        name:'The Spanish Game',
        description: 'The Spanish game begins with e4 e5 2.Nf3 Nc6 3.Bb5. ',
        image: 'strategy-FranceGame.png'
    },
    {
        name:'The French Defense',
        description: 'The French game begins with 1.e4 e6. ',
        image: 'img.png'
    }
]

const Card = (props) => {
     console.log(props.props)
    const [Page,setPage] = useState(0)
    console.log(Page,strategies[0].name)
    return (
        <div style={{width:"50%",overflow:"hidden"}}>
            {props.props==true?
                <div style={{width:"80%",overflow:"hidden"}}>
                    <div>
                        <h3 style={contentStyle}>
                            <div>
                                <h4 style={{lineHeight: '40px'}}>{strategies[Page].name}</h4>
                                <p style={{lineHeight: '5px',textAlign:'center',fontSize:'.8rem',marginTop:'-15px'}}>{strategies[Page].description}</p>
                                <img src={`/${strategies[Page].image}`} alt={strategies[Page].name} style={{width:'200px',marginTop:'5px'}}/>
                            </div>
                        </h3>
                    </div>
                <div style={{marginTop:'20px'}}>
                    <Button block  size='large' onClick={()=>setPage(0)} className='button' style={{width:"400px",height: "55px"}}>Italian Game</Button>
                    <Button block  size='large' onClick={()=>setPage(1)} className='button' style={{width:"400px",height: "55px"}}>Spanish Game</Button>
                    <Button block  size='large' onClick={()=>setPage(2)} className='button' style={{width:"400px",height: "55px"}}>French Defense</Button>
                </div>
                </div>
                :null
            }
        </div>
    );
};
export default Card;
