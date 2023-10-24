import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import Sword from '@mui/icons-material/ColorizeTwoTone';
import Run from '@mui/icons-material/DirectionsRunTwoTone';
import Message from '@mui/icons-material/MessageTwoTone';
import '../style/Timeline.css'

import SvgIcon from '@mui/material/SvgIcon';


export default function TimelineApp() {
    const [page, setPage] = React.useState(1)
    const [prevButtonDisabled, setPrevButtonDisabled] = React.useState(true)
    const [nextButtonDisabled, setNextButtonDisabled] = React.useState(false)


    const prevButton = () => {
        setPage(1)
        setPrevButtonDisabled(true)
        setNextButtonDisabled(false)
        console.log(prevButtonDisabled)
        console.log(nextButtonDisabled)
    }

    const nextButton = () => {
        setPage(2)
        setPrevButtonDisabled(false)
        setNextButtonDisabled(true)
        console.log(prevButtonDisabled)
        console.log(nextButtonDisabled)
    }

    const generatePage = () => {
        if(page === 1){
            return(
                <>
                <TimelineItem>
                    <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    align="right"
                    variant="body2"
                    color="text.secondary"
                    >
                    9:30 am
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color='primary'>
                        <Sword/>
                    </TimelineDot>
                    <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography variant="h6" component="span">
                        Eat
                    </Typography>
                    <Typography>Because you need strength</Typography>
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    variant="body2"
                    color="text.secondary"
                    >
                    10:00 am
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color="primary">
                        <Run />
                    </TimelineDot>
                    <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography variant="h6" component="span">
                        Code
                    </Typography>
                    <Typography>Because it&apos;s awesome!</Typography>
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color="primary">
                        <Message />
                    </TimelineDot>
                    <TimelineConnector/>
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography variant="h6" component="span">
                        Sleep
                    </Typography>
                    <Typography>Because you need rest</Typography>
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                    <TimelineConnector/>
                    <TimelineDot color="primary">
                        <Message />
                    </TimelineDot>
                    <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography variant="h6" component="span">
                        Repeat
                    </Typography>
                    <Typography>Because this is the life you love!</Typography>
                    </TimelineContent>
                </TimelineItem>
                </>
            )
        }

        else if(page === 2){
            return(
                <>
                <TimelineItem>
                    <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    align="right"
                    variant="body2"
                    color="text.secondary"
                    >
                    9:30 am
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color='secondary'>
                        <Sword/>
                    </TimelineDot>
                    <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography variant="h6" component="span">
                        Eat
                    </Typography>
                    <Typography>Because you need strength</Typography>
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    variant="body2"
                    color="text.secondary"
                    >
                    10:00 am
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color="primary">
                        <Run />
                    </TimelineDot>
                    <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography variant="h6" component="span">
                        Code
                    </Typography>
                    <Typography>Because it&apos;s awesome!</Typography>
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color="primary">
                        <Message />
                    </TimelineDot>
                    <TimelineConnector/>
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography variant="h6" component="span">
                        Sleep
                    </Typography>
                    <Typography>Because you need rest</Typography>
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                    <TimelineConnector/>
                    <TimelineDot color="primary">
                        <Message />
                    </TimelineDot>
                    <TimelineConnector/>
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography variant="h6" component="span">
                        Repeat
                    </Typography>
                    <Typography>Because this is the life you love!</Typography>
                    </TimelineContent>
                </TimelineItem>
                </>
            )
        }
    }

  return (
    <>
        <Timeline position="alternate">
            {generatePage()}
        </Timeline>
        <button className={prevButtonDisabled? 'disabled' : 'enabled'} style={{float: "left" }} onClick={prevButton} disabled={prevButtonDisabled}>Previous Day</button>
        <button className={nextButtonDisabled? 'disabled' : 'enabled'} style={{float: "right"}} onClick={nextButton} disabled={nextButtonDisabled}>Next Day</button>
    </>
  );
}