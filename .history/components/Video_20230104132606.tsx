import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import { VideoModel } from "../db/models/video"

export default function ActionAreaCard(videoData: VideoModel) {
    return (
        <Grid item xs={2} sm={4} md={4}>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image=""
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Kenny Blaq cracked fans up at this Xmas carol 2022
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Efritin Gospel
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
}