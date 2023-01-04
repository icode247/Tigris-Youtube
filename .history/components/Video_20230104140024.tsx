import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import Link from 'next/link'

export default function ActionAreaCard({video}: any) {
    console.log(video)
    return (
        <Grid item xs={2} sm={4} md={4}>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={video.video}
                        alt={video.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          <Link href="/watch/">{video.name}</Link>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {video.user}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
}