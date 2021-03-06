import useSWR from 'swr'
import axios from 'axios'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Card, CardActionArea, styled, Typography } from '@mui/material';
import { getCobaltLiveblogPostHelper } from '../../lib/cobalt-cms/cobalt-helpers';
import RenderContentElement from '../RenderContent/RenderContentElement';
import { findElementsInContentJson } from '../../utils/ContentUtil';
import { Box } from '@mui/system';
import Link from 'next/link';


const fetcher = url => axios.get(url).then(res => res.data)

export default function LiveblogFragment({ cobaltData, gridContext }) {
    let render = null;
    if (cobaltData) {
        let blogId = cobaltData.object.data.id;

        let data, error = null;

        ({ data, error } = useSWR('/api/' + cobaltData.siteContext.site + '/liveblogs/' + blogId, fetcher, { refreshInterval: 5000, dedupingInterval: 0 }));

        if (error) return <div>Failed to load</div>
        if (!data) return <div>Loading...</div>

        const CustomizedTimeline = styled(Timeline)`
        .MuiTimelineItem-root:before {
            content: none
        }
        `;

        let postCount = 3;
        try {
            postCount = cobaltData.linkContext.linkData.parameters.lbCount
        } catch (e) { }

        const pulsatingIcon = (
            <Box component="span"
                sx={{

                    borderRadius: '62.5rem',
                    display: 'inline-block',
                    position: 'relative',
                    backgroundColor: '#7aa09c',
                    width: '.75em',
                    height: '.75em',
                    marginRight: '0.4rem',
                    verticalAlign: 'initial',
                    animation: '3s ease-in 1s infinite reverse both running slidein',

                    color: '#7aa09c'
                }} />
        )

        let myUrl = ""
        try {
            myUrl = cobaltData.pageContext.nodesUrls[cobaltData.object.data.id]
        } catch (e) { }

        let headline = null;
        try {
            headline = cobaltData.linkContext.linkData.parameters.customHeadline
        } catch (e) { }

        if (!headline) {
            try {
                headline = <RenderContentElement jsonElement={findElementsInContentJson(['headline'], cobaltData.object.helper.content)[0]} />
            } catch (e) {
            }
        }

        render = (
            <Card square elevation={0} sx={{ border: 2, p:1, mb:1, borderColor: 'secondary.main' }}>
                <Link href={myUrl} passHref prefetch={(cobaltData.previewData ? false : true)}>
                    <CardActionArea>
                        <Typography sx={{ my: 0 }} variant="h5" component="div">
                            {pulsatingIcon}
                            {headline}
                        </Typography>
                        <CustomizedTimeline sx={{ my: 0, pr: 1 }} position="right">
                            {data.result.slice(0, postCount).map((post, i, { length }) => {
                                let itemRender = null;
                                const postContent = getCobaltLiveblogPostHelper(post);
                                itemRender = (
                                    <TimelineItem>
                                        <TimelineSeparator>
                                            <TimelineDot />
                                            {(length - 1 === i ? null : <TimelineConnector />)}
                                        </TimelineSeparator>
                                        <TimelineContent sx={{ pr: 0 }}>
                                            <Typography variant="body1">
                                                <RenderContentElement jsonElement={findElementsInContentJson(['h1'], postContent.content)[0]} />
                                            </Typography>
                                        </TimelineContent>
                                    </TimelineItem>)
                                return itemRender;
                            })}
                        </CustomizedTimeline>
                    </CardActionArea>
                </Link>
            </Card>
        )
    }
    return render;
}