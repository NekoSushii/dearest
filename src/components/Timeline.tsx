import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import Sword from '@mui/icons-material/ColorizeTwoTone';
import Run from '@mui/icons-material/DirectionsRunTwoTone';
import Message from '@mui/icons-material/MessageTwoTone';
import Airplane from '@mui/icons-material/LocalAirportTwoTone';
import TimelineOppositeContent, {
    timelineOppositeContentClasses,
  } from '@mui/lab/TimelineOppositeContent';
import '../style/Timeline.css'


export default function TimelineApp() {
    const [page, setPage] = React.useState(1)
    const [prevButtonDisabled, setPrevButtonDisabled] = React.useState(true)
    const [nextButtonDisabled, setNextButtonDisabled] = React.useState(false)

    const timelinePageOne: any[] = [
        {
            time: '0630',
            type: 'sword',
            title: 'Hamas Launch Rockets',
            content: "Hamas launches rockets towards Tel Aviv, Ashkelon, Beersheba, Sderot, and the rest of the Southern District",
            link: 'https://www.janes.com/defence-news/news-detail/israelgaza-situation-update-8-october-2023',
            side: '2',
        },
        {
            time: '0746',
            type: 'message',
            title: 'IDF Press Conference',
            content: "Isreal Defense Forces (IDF) announces infiltration of Hamas militants from Haza, Erez Crossing, Nahal Oz, Mages, Kibbutz Be'eri, Rehim Army Base, Zikim Youth Army Base, and Kfar Azz",
            link: 'https://www.janes.com/defence-news/news-detail/israelgaza-situation-update-8-october-2023',
            side: '1',
        },
        {
            time: '0853',
            type: 'message',
            title: 'Hamas Press Conference',
            content: "Military Commander of the Hamas Muhammad Al-Deif announces Operation 'Al-Aqsa Flood', claims to launch 5,000 rockets on Isreal",
            link: 'https://www.janes.com/defence-news/news-detail/israelgaza-situation-update-8-october-2023',
            side: '2',
        },
        {
            time: '0952',
            type: 'airplane',
            title: 'Isreal Shuts Down Airport',
            content: "All airports in Central and Southern districts close down",
            link: 'https://www.janes.com/defence-news/news-detail/israelgaza-situation-update-8-october-2023',
            side: '1',
        },
        {
            time: '1049',
            type: 'sword',
            title: 'Isreal retaliates',
            content: "The IDF launches retaliatory rockets towards Gaza",
            link: 'https://www.janes.com/defence-news/news-detail/israelgaza-situation-update-8-october-2023',
            side: '1',
        },
        {
            time: "1152",
            type: "message",
            title: "Isreal mobilises",
            content: "The IDF declares 'state of war' and mobilises reserve forces",
            link: 'https://www.janes.com/defence-news/news-detail/israelgaza-situation-update-8-october-2023',
            side: '1',
        },
        {
            time: "1159",
            type: "message",
            title: "Isreal announces Operation 'Swords and Iron'",
            content: "The IDF announces Operation 'Sword of Iron', a large-scale operation against Hamas",
            link: 'https://www.janes.com/defence-news/news-detail/israelgaza-situation-update-8-october-2023',
            side: '1',
        },
        {
            time: "1208",
            type: "message",
            title: "Isreal declares war",
            content: "Isreal Prime Minister Benjamin Netanyahu declares war on Hamas. He added the first line of action is clearing the communities from terrorists",
            link: 'https://www.janes.com/defence-news/news-detail/israelgaza-situation-update-8-october-2023',
            side: '1',
        },
        {
            time: "1305",
            type: "message",
            title: "Isreal ground situation",
            content: "Isreal Police spokesperson Dean Elsdunne confirms 21 active fronts of fighting against Hamas in southern Isreal",
            link: 'https://www.janes.com/defence-news/news-detail/israelgaza-situation-update-8-october-2023',
            side: '1',
        },
        {
            time: "1746",
            type: "message",
            title: "Isreal reports casualties",
            content: "The IDF confirms death of 26 security personnel",
            link: 'https://www.janes.com/defence-news/news-detail/israelgaza-situation-update-8-october-2023',
            side: '1',
        },
        {
            time: "1928",
            type: "message",
            title: "Isreal reports on Hamas rocket attack",
            content: "The IDF announces Hamas launched 2,200 rockets from Gaza into Isreal",
            link: 'https://www.janes.com/defence-news/news-detail/israelgaza-situation-update-8-october-2023',
            side: '1',
        },
        {
            time: "1935",
            type: "sword",
            title: "Isreal announces retaliatory rocket strikes against Hamas",
            content: "The IDF announces airstrikes on Hamas positions. Palestine Health Ministry announces 232 civilian deaths and 1,697 injuries",
            link: 'https://www.janes.com/defence-news/news-detail/israelgaza-situation-update-8-october-2023',
            side: '1',
        },
        {
            time: "1954",
            type: "message",
            title: "Isreal civilian casualties report",
            content: "Isreal Emergency Services announces 300 civilian deaths and 1,500 civilian injuries since the beginning of the Hamas attack",
            link: 'https://www.janes.com/defence-news/news-detail/israelgaza-situation-update-8-october-2023',
            side: '1',
        },
        {
            time: "2143",
            type: "message",
            title: "Isreal confirms hostages taken by Hamas",
            content: "The IDF confirms at least 24 hostages taken by Hamas",
            link: 'https://www.janes.com/defence-news/news-detail/israelgaza-situation-update-8-october-2023',
            side: '1',
        },
    ]

    const timelinePageTwo: any[] = [
        {
            time: "0315",
            type: "message",
            title: "Hamas claims Iranian support",
            content: "Hamas spokes person Ghazi Hamad claims that Iran helped in the multipronged attack by the group on Isreal",
            link: 'https://www.straitstimes.com/singapore/community/protection-of-civilians-more-aid-needed-to-prevent-catastrophe-in-gaza-president-tharman',
            side: '2',
        },
        {
            time: "0415",
            type: "message",
            title: "IDF claims 1,000 Hamas militants in Isreal",
            content: "IDF spokesperson Lieutenant Colonel Jonathan Conricus confirms at least 1,000 Hamas militants took part in the attack and fighting to clear civilian settlements off militants",
            link: 'https://www.straitstimes.com/singapore/community/protection-of-civilians-more-aid-needed-to-prevent-catastrophe-in-gaza-president-tharman',
            side: '1',
        },
        {
            time: "0740",
            type: "sword",
            title: "Hezbollah attacks Isreal",
            content: "Hezbollah confirms motar attacks on IDF positions on Isreal-Lebanon border",
            link: 'https://www.straitstimes.com/singapore/community/protection-of-civilians-more-aid-needed-to-prevent-catastrophe-in-gaza-president-tharman',
            side: '2',
        },
        {
            time: "0752",
            type: "sword",
            title: "IDF airstrikes",
            content: "The IDF announces airstrikes on 428 Hamas positions and 10 observation towers",
            link: 'https://www.straitstimes.com/singapore/community/protection-of-civilians-more-aid-needed-to-prevent-catastrophe-in-gaza-president-tharman',
            side: '1',
        },
        {
            time: "0840",
            type: "sword",
            title: "IDF retakes lost grounds",
            content: "The IDF confirms retaking of Sderot Police Station by elimnating 10 Hamas militants",
            link: 'https://www.straitstimes.com/singapore/community/protection-of-civilians-more-aid-needed-to-prevent-catastrophe-in-gaza-president-tharman',
            side: '1',
        },
        {
            time: "1128",
            type: "sword",
            title: "Hamas rocket strikes on Sderot town",
            content: "Hamas claims firing of 100 rockets at Sderot town",
            link: 'https://www.straitstimes.com/singapore/community/protection-of-civilians-more-aid-needed-to-prevent-catastrophe-in-gaza-president-tharman',
            side: '2',
        },
        {
            time: "1230",
            type: "message",
            title: "IDF casualty report",
            content: "The IDF confirms deaths of 44 IDF personnel and 30 security personnel since 7 October",
            link: 'https://www.straitstimes.com/singapore/community/protection-of-civilians-more-aid-needed-to-prevent-catastrophe-in-gaza-president-tharman',
            side: '1',
        },
        {
            time: "1430",
            type: "run",
            title: "IDF evcuates civilian from conflict zone",
            content: "The IDF evacuates 20 Isreali settlements adjacent to the Gaza security fence",
            link: 'https://www.straitstimes.com/singapore/community/protection-of-civilians-more-aid-needed-to-prevent-catastrophe-in-gaza-president-tharman',
            side: '1',
        },
        {
            time: "1436",
            type: "message",
            title: "Knesset declares war",
            content: "The Knesset invokes Article 40 Aleph, officially declaring a war against Hamas and Palestine Islamic Jihad",
            link: 'https://www.straitstimes.com/singapore/community/protection-of-civilians-more-aid-needed-to-prevent-catastrophe-in-gaza-president-tharman',
            side: '1',
        },
        {
            time: "1602",
            type: "sword",
            title: "Isreal air force strikes Hamas headquarters in Gaza",
            content: "Isreal Air Force strikes three Hamas headquarters in Gaza",
            link: 'https://www.straitstimes.com/singapore/community/protection-of-civilians-more-aid-needed-to-prevent-catastrophe-in-gaza-president-tharman',
            side: '1',
        },
    ]


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
                <h1>October 7</h1>
                {timelinePageOne.map((item, index) => (
                    <TimelineItem>
                        <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="text.secondary">
                            {item.time}
                        </TimelineOppositeContent>

                        <TimelineSeparator>
                            <TimelineConnector />
                            <TimelineDot color={item.side === '1' ? 'primary' : item.side === '2' ? 'secondary' : 'primary'}>
                                {item.type === 'sword' ? <Sword/> : item.type === 'message' ? <Message/> : item.type === 'airplane' ? <Airplane/> : item.type === 'run' ? <Run/> : ''}
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>

                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                            <Typography variant="h6" component="span">
                                <a href={item.link}>{item.title}</a>
                            </Typography>
                            <Typography>
                                {item.content}
                            </Typography>
                        </TimelineContent>
                    </TimelineItem>
                ))}
                </>
            )
        }

        else if(page === 2){
            return(
                <>
                <h1>October 8</h1>
                {timelinePageTwo.map((item, index) => (
                    <TimelineItem>
                        <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="text.secondary">
                            {item.time}
                        </TimelineOppositeContent>

                        <TimelineSeparator>
                            <TimelineConnector />
                            <TimelineDot color={item.side === '1' ? 'primary' : item.side === '2' ? 'secondary' : 'primary'}>
                                {item.type === 'sword' ? <Sword/> : item.type === 'message' ? <Message/> : item.type === 'airplane' ? <Airplane/> : item.type === 'run' ? <Run/> : ''}
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>

                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                            <Typography variant="h6" component="span">
                                {item.title}
                            </Typography>
                            <Typography>
                                {item.content}
                            </Typography>
                        </TimelineContent>
                    </TimelineItem>
                ))}
                </>
            )
        }
    }

  return (
    <>  
    <div className='top'>
        <button className={prevButtonDisabled? 'disabled' : 'enabled'} style={{float: "left" }} onClick={prevButton} disabled={prevButtonDisabled}>Previous Day</button>
        <button className={nextButtonDisabled? 'disabled' : 'enabled'} style={{float: "right"}} onClick={nextButton} disabled={nextButtonDisabled}>Next Day</button>
    </div>
    <div className='timeline_font'>
        <Timeline position="right" sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.2,
        },
      }}>
            {generatePage()}
        </Timeline>
    </div>
    <div className='bottom'>
        <button className={prevButtonDisabled? 'disabled' : 'enabled'} style={{float: "left" }} onClick={prevButton} disabled={prevButtonDisabled}>Previous Day</button>
        <button className={nextButtonDisabled? 'disabled' : 'enabled'} style={{float: "right"}} onClick={nextButton} disabled={nextButtonDisabled}>Next Day</button>
    </div>
    </>
  );
}