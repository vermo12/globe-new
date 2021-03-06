import { Box, Container, Grid, Typography } from "@mui/material";
import NextLink from 'next/link'
import { Link as MUILink } from '@mui/material';
import React from "react";
import { getCobaltDataHelper, getDwxLinkedObjects, getObjectMainSection, getObjectMainSite, isCurrentSiteContent } from "../../lib/cobalt-cms/cobalt-helpers";
import GenericFragment from "../Fragment/GenericFragment";

export default function Segment({ cobaltData }) {
    let render = null;
    let templateName = null;
    if (cobaltData.linkContext) {
        templateName = cobaltData.linkContext.linkTemplate;
    } else {
        // Might be a preview request directly on the Segment
        templateName = cobaltData.object.helper.pageTemplate;
    }
    let firstObjects = []
    firstObjects = getDwxLinkedObjects(cobaltData, "first")
    let secondObjects = []
    secondObjects = getDwxLinkedObjects(cobaltData, "second")
    let opinionObjects = []
    opinionObjects = getDwxLinkedObjects(cobaltData, "opinion")
    let extraObjects = []
    extraObjects = getDwxLinkedObjects(cobaltData, "extra")

    let sectionHeadline = null;
    try {
        sectionHeadline = cobaltData.object.data.attributes.classification.genres[0]
    } catch (e) { }

    let needsHeader = false;
    let isOtherSite = false;

    if (!isCurrentSiteContent(cobaltData.object.data, cobaltData.siteContext)) {
        needsHeader = true;
        isOtherSite = true;
    }

    switch (templateName) {
        case 'featured_standard':
            render = (
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3} order={{ xs: 2, md: 1 }}>
                        {secondObjects.map((object, i) => <GenericFragment key={i} cobaltData={object} gridContext={{ xs: 12, md: 3 }} />)}
                    </Grid>
                    <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
                        {firstObjects.map((object, i) => <GenericFragment key={i} cobaltData={object} gridContext={{ xs: 12, md: 6 }} />)}
                    </Grid>
                    <Grid item xs={12} md={3} order={{ xs: 3, md: 3 }}>
                        {opinionObjects.map((object, i) => <GenericFragment key={i} cobaltData={object} gridContext={{ xs: 12, md: 3 }} />)}
                    </Grid>
                    {extraObjects.map((object, i) => (
                        <Grid item xs={12} md={2} order={{ xs: 4, md: 4 }} key={i}>
                            <GenericFragment cobaltData={object} gridContext={{ xs: 12, md: 2 }} />
                        </Grid>
                    ))}
                </Grid>
            );
            break;
        case 'featured_big':
            render = (
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                        {firstObjects.map((object, i) => <GenericFragment key={i} cobaltData={object} gridContext={{ xs: 12, md: 8 }} />)}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        {secondObjects.map((object, i) => <GenericFragment key={i} cobaltData={object} gridContext={{ xs: 12, md: 4 }} />)}
                    </Grid>
                    {opinionObjects.map((object, i) => (
                        <Grid key={i} item xs={12} md={3}>
                            <GenericFragment cobaltData={object} gridContext={{ xs: 12, md: 3 }} />
                        </Grid>
                    ))}
                    {extraObjects.map((object, i) => (
                        <Grid key={i} item xs={12} md={2}>
                            <GenericFragment cobaltData={object} gridContext={{ xs: 12, md: 2 }} />
                        </Grid>
                    ))}
                </Grid>
            )
            break;
        case 'featured_condensed':
            render = (
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        <GenericFragment cobaltData={null} gridContext={{ xs: 12, md: 3 }} />
                        <GenericFragment cobaltData={null} gridContext={{ xs: 12, md: 3 }} />
                        <GenericFragment cobaltData={null} gridContext={{ xs: 12, md: 3 }} />
                        <GenericFragment cobaltData={null} gridContext={{ xs: 12, md: 3 }} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <GenericFragment cobaltData={null} gridContext={{ xs: 12, md: 6 }} />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <GenericFragment cobaltData={null} gridContext={{ xs: 12, md: 3 }} />
                        <GenericFragment cobaltData={null} gridContext={{ xs: 12, md: 3 }} />
                        <GenericFragment cobaltData={null} gridContext={{ xs: 12, md: 3 }} />
                        <GenericFragment cobaltData={null} gridContext={{ xs: 12, md: 3 }} />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <GenericFragment cobaltData={null} gridContext={{ xs: 12, md: 2 }} />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <GenericFragment cobaltData={null} gridContext={{ xs: 12, md: 2 }} />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <GenericFragment cobaltData={null} gridContext={{ xs: 12, md: 2 }} />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <GenericFragment cobaltData={null} gridContext={{ xs: 12, md: 2 }} />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <GenericFragment cobaltData={null} gridContext={{ xs: 12, md: 2 }} />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <GenericFragment cobaltData={null} gridContext={{ xs: 12, md: 2 }} />
                    </Grid>
                </Grid>
            );
            break;
        case 'section_teaser':
            needsHeader = true;
            render = (
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        {firstObjects.map((object, i) => <GenericFragment key={i} cobaltData={object} gridContext={{ xs: 12, md: 6 }} />)}
                    </Grid>
                    <Grid item xs={12} md={3}>
                        {secondObjects.slice(0, 3).map((object, i) => <GenericFragment key={i} cobaltData={object} gridContext={{ xs: 12, md: 3 }} />)}
                    </Grid>
                    <Grid item xs={12} md={3}>
                        {secondObjects.slice(3, 6).map((object, i) => <GenericFragment key={i} cobaltData={object} gridContext={{ xs: 12, md: 3 }} />)}
                    </Grid>
                </Grid>
            );
            break;
        case 'section_teaser_big':
            needsHeader = true;
            render = (
                <Grid container spacing={2}>
                    <Grid item xs={12} md={9}>
                        {firstObjects.map((object, i) => <GenericFragment key={i} cobaltData={object} gridContext={{ xs: 12, md: 9 }} />)}
                    </Grid>
                    <Grid item xs={12} md={3}>
                        {secondObjects.map((object, i) => <GenericFragment key={i} cobaltData={object} gridContext={{ xs: 12, md: 3 }} />)}
                    </Grid>
                    {opinionObjects.slice(0, 3).map((object, i) => (
                        <Grid key={i} item xs={12} md={4}>
                            <GenericFragment cobaltData={object} gridContext={{ xs: 12, md: 4 }} />
                        </Grid>
                    ))}
                    {extraObjects.map((object, i) => (
                        <Grid key={i} item xs={12} md={2}>
                            <GenericFragment cobaltData={object} gridContext={{ xs: 12, md: 2 }} />
                        </Grid>
                    ))}
                </Grid>
            );
            break;
        case 'section_top':
            render = (
                <React.Fragment>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            {firstObjects.map((object, i) => <GenericFragment key={i} cobaltData={object} gridContext={{ xs: 12, md: 6 }} />)}
                        </Grid>
                        <Grid item xs={12} md={3}>
                            {secondObjects.slice(0, 3).map((object, i) => <GenericFragment key={i} cobaltData={object} gridContext={{ xs: 12, md: 3 }} />)}
                        </Grid>
                        <Grid item xs={12} md={3}>
                            {secondObjects.slice(3, 6).map((object, i) => <GenericFragment key={i} cobaltData={object} gridContext={{ xs: 12, md: 3 }} />)}
                        </Grid>
                    </Grid>
                </React.Fragment>
            )
    }
    if (cobaltData.previewData) {
        // In preview mode, wrap the DWC with a maxWidth container identical to homepage
        render = <Container maxWidth="lg">
            {render}
        </Container>
    }

    if (needsHeader) {
        let otherHostname = null;
        let otherSiteBaseUrl = null;
        let finalUrl = null;
        let errorGettingOtherSite = false
        try {
            let sectionUrl = null;
            let siteInfo = null;
            if (isOtherSite) {
                siteInfo = cobaltData.siteContext.siteStructure.find((site) => site.name === getObjectMainSite(cobaltData.object.data))
                otherHostname = siteInfo.customAttributes.frontendHostname;
                otherSiteBaseUrl = process.env.NEXT_PUBLIC_HTTP_PROTO + '://' + otherHostname + ':' + process.env.NEXT_PUBLIC_HTTP_PORT
            }
            sectionUrl = getObjectMainSection(cobaltData.object.data);
            finalUrl = (otherSiteBaseUrl ? otherSiteBaseUrl : "") + sectionUrl

        } catch (e) {
            console.log(e);
            errorGettingOtherSite = true;
        }
        if (!errorGettingOtherSite) {
            render = <React.Fragment>
                <Box sx={{ mb: 2, backgroundColor: 'secondary.main' }}
                    display="flex"
                    justifyContent="space-between"
                >
                    <Typography sx={{ mx: 2, my: 1, color: 'primary.main' }} variant="h4" component="h4">
                        <NextLink href={finalUrl} passHref prefetch={(cobaltData.previewData ? false : true)}>
                            <MUILink variant="h4" underline="hover">
                                {sectionHeadline}
                            </MUILink>
                        </NextLink>
                    </Typography>
                    {isOtherSite ?
                        <Typography sx={{ mx: 2, mb: 1, mt: 2, color: 'primary.main' }} variant="h6" component="div">
                            <span>From </span>
                            <NextLink href={otherSiteBaseUrl} passHref prefetch={(cobaltData.previewData ? false : true)}>
                                <MUILink variant="h6" underline="always">
                                    {otherHostname}
                                </MUILink>
                            </NextLink>
                        </Typography>
                        : null}
                </Box>
                {/* <Box sx={{ my: 1, borderTop: 2, borderColor: 'grey.500' }}>
                <Typography sx={{ my: 1 }} variant="h4" component="div">{sectionHeadline}</Typography>
            </Box> */}
                {render}
            </React.Fragment>
        }
    }
    return render;
}