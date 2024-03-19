import * as React from 'react';
import PropTypes from 'prop-types';
import { Input as BaseInput } from '@mui/base/Input';
import { Box, styled } from '@mui/system';
import { Button } from '@mui/material';
import { sendNewOtp,checkOtp } from '../../service/accountService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function OTP({ separator, length, value, onChange }) {
    const inputRefs = React.useRef(new Array(length).fill(null));

    const focusInput = (targetIndex) => {
        const targetInput = inputRefs.current[targetIndex];
        targetInput.focus();
    };

    const selectInput = (targetIndex) => {
        const targetInput = inputRefs.current[targetIndex];
        targetInput.select();
    };

    const handleKeyDown = (event, currentIndex) => {
        switch (event.key) {
            case 'ArrowUp':
            case 'ArrowDown':
            case ' ':
                event.preventDefault();
                break;
            case 'ArrowLeft':
                event.preventDefault();
                if (currentIndex > 0) {
                    focusInput(currentIndex - 1);
                    selectInput(currentIndex - 1);
                }
                break;
            case 'ArrowRight':
                event.preventDefault();
                if (currentIndex < length - 1) {
                    focusInput(currentIndex + 1);
                    selectInput(currentIndex + 1);
                }
                break;
            case 'Delete':
                event.preventDefault();
                onChange((prevOtp) => {
                    const otp =
                        prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
                    return otp;
                });

                break;
            case 'Backspace':
                event.preventDefault();
                if (currentIndex > 0) {
                    focusInput(currentIndex - 1);
                    selectInput(currentIndex - 1);
                }

                onChange((prevOtp) => {
                    const otp =
                        prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
                    return otp;
                });
                break;

            default:
                break;
        }
    };

    const handleChange = (event, currentIndex) => {
        const currentValue = event.target.value;
        let indexToEnter = 0;

        while (indexToEnter <= currentIndex) {
            if (inputRefs.current[indexToEnter].value && indexToEnter < currentIndex) {
                indexToEnter += 1;
            } else {
                break;
            }
        }
        onChange((prev) => {
            const otpArray = prev.split('');
            const lastValue = currentValue[currentValue.length - 1];
            otpArray[indexToEnter] = lastValue;
            return otpArray.join('');
        });
        if (currentValue !== '') {
            if (currentIndex < length - 1) {
                focusInput(currentIndex + 1);
            }
        }
    };

    const handleClick = (event, currentIndex) => {
        selectInput(currentIndex);
    };

    const handlePaste = (event, currentIndex) => {
        event.preventDefault();
        const clipboardData = event.clipboardData;

        // Check if there is text data in the clipboard
        if (clipboardData.types.includes('text/plain')) {
            let pastedText = clipboardData.getData('text/plain');
            pastedText = pastedText.substring(0, length).trim();
            let indexToEnter = 0;

            while (indexToEnter <= currentIndex) {
                if (inputRefs.current[indexToEnter].value && indexToEnter < currentIndex) {
                    indexToEnter += 1;
                } else {
                    break;
                }
            }

            const otpArray = value.split('');

            for (let i = indexToEnter; i < length; i += 1) {
                const lastValue = pastedText[i - indexToEnter] ?? ' ';
                otpArray[i] = lastValue;
            }

            onChange(otpArray.join(''));
        }
    };

    return (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {new Array(length).fill(null).map((_, index) => (
                <React.Fragment key={index}>
                    <BaseInput
                        slots={{
                            input: InputElement,
                        }}
                        aria-label={`Digit ${index + 1} of OTP`}
                        slotProps={{
                            input: {
                                ref: (ele) => {
                                    inputRefs.current[index] = ele;
                                },
                                onKeyDown: (event) => handleKeyDown(event, index),
                                onChange: (event) => handleChange(event, index),
                                onClick: (event) => handleClick(event, index),
                                onPaste: (event) => handlePaste(event, index),
                                value: value[index] ?? '',
                            },
                        }}
                    />
                    {index === length - 1 ? null : separator}
                </React.Fragment>
            ))}
        </Box>
    );
}

OTP.propTypes = {
    length: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    separator: PropTypes.node,
    value: PropTypes.string.isRequired,
};

export default function OTPInput(props) {
    const navigate = useNavigate()
    const [countDown, setCountDown] = React.useState(60)
    const [secondText, setSecondText] = React.useState("seconds")
    const handleSendOtp = async (accountId, email) => {
        return new Promise(async (resolve, reject) => {
            await sendNewOtp(accountId, email).then((res) => {
                if (res.EC === 1) {
                    setCountDown(60)
                    resolve()
                }
                else reject()
            })
        })
    }

    const [otp, setOtp] = React.useState('');

    const [accountId,setAccountId]=React.useState(props.accountId)
    const [email,setEmail]=React.useState(props.email)
    
    console.log((accountId,email));
    console.log(accountId,email);
    const handleSendNewOtpClick = () => {
        if (countDown === 0) {
            const promise = handleSendOtp(accountId, email)
            toast.promise(promise, {
                pending: 'Sending OTP',
                success: 'Send OTP Successfully',
                error: 'Error when sending OTP',
            })
        }
    }

    React.useEffect(() => {
        if (countDown > 0) {
            const timerId = setInterval(() => {
                setCountDown(countDown => countDown - 1);
                if (countDown <= 10) setSecondText("second")
                else setSecondText("seconds")
            }, 1000);

            return () => clearInterval(timerId);
        }
    }, [countDown]);

    const handleConfirm = async () => {
        if(!otp){
            toast.warn("OTP is missing")
            return
        }
        await checkOtp(accountId,otp).then((res)=>{
            if(res.DT===1){
                navigate('/account/password/change-password',{state:{accountId:accountId}})
            } else toast.error("The OTP is correct or expired")
        })
    }


    return (
        <div style={{ display: 'flex', justifyContent: "center", flexDirection: 'column' }}>
            <h2 style={{ marginBottom: '40px' }}>OTP for Password Recovering</h2>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <OTP separator={<span>-</span>} value={otp} onChange={setOtp} length={8} />
                <span>Entered value: {otp}</span>
            </Box>
            <button
                style={{
                    border: 'none',
                    outline: 'none',
                    backgroundColor: 'white',

                    fontFamily: 'Roboto Slab'
                }}
                disabled={countDown > 0}
                onClick={handleSendNewOtpClick}
            >Resend new OTP in<span style={{ fontWeight: 'bold' }}> {countDown} </span>{secondText}</button>
            <Button style={{
                backgroundColor: '#1a2d59',
                color: '#fff',
                marginTop: '20px',
                fontWeight: 'bold'
            }}
            onClick={handleConfirm}>
                CONFIRM
            </Button>
        </div>
    );
}

const blue = {
    100: '#DAECFF',
    200: '#80BFFF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B2',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const InputElement = styled('input')(
    ({ theme }) => `
  width: 40px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 0px;
  border-radius: 8px;
  text-align: center;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
        };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);