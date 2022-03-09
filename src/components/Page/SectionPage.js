import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getSearchResultObjects } from "../../lib/cobalt-cms/cobalt-helpers";
import GenericFragment from "../Fragment/GenericFragment";

export default function SectionPage({ cobaltData, pageTitle }) {
    let render = null;
    
    const searchResults = getSearchResultObjects(cobaltData);

    render = (
        <Container maxWidth="lg">
            {(pageTitle ?
                <Box sx={{ mb: 2, backgroundColor: 'secondary.main' }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <Typography sx={{ color: 'primary.main' }} variant="h2" component="h2">
                        {pageTitle}
                    </Typography>
                </Box> : null)}
            <Grid container spacing={2}>
                {searchResults.map((object, i) => (
                    <Grid key={i} item xs={12} md={4}>
                        <GenericFragment cobaltData={object} gridContext={{ xs: 12, md: 4 }} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )

    return render;
}