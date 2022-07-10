import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TaskService from '../services/task.service';
import startOfWeek from 'date-fns/startOfWeek'
import endOfWeek from 'date-fns/endOfWeek'
import subWeeks from 'date-fns/subWeeks'
import subMonths from 'date-fns/subMonths'
import startOfYear from 'date-fns/startOfYear'
import endOfYear from 'date-fns/endOfYear'

function CircularProgressWithLabel(props) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                >
                <Typography component="div" color="text.secondary">
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

function TodoCard() {
    const [filter, setFilter] = useState("this week");
    const [content, setContent] = useState();

    useEffect(() => {
        var data = {};
        var today = new Date; // get current date
        if (filter == "this week") {
            var firstDay = startOfWeek(today, {weekStartsOn: 2})
            var lastDay = endOfWeek(today, {weekStartsOn: 1})
            data = {"from": firstDay.toISOString().split('T')[0], "to": lastDay.toISOString().split('T')[0]}
        }else if (filter == "last week") {
            var lastWeek = subWeeks(today, 1)
            var firstDay = startOfWeek(lastWeek, {weekStartsOn: 2})
            var lastDay = endOfWeek(lastWeek, {weekStartsOn: 1})
            data = {"from": firstDay.toISOString().split('T')[0], "to": lastDay.toISOString().split('T')[0]}
        } else if (filter == "last six months") {
            var lastSixMonths = subMonths(today, 6)
            var firstDay = startOfWeek(lastSixMonths, {weekStartsOn: 2})
            data = {"from": firstDay.toISOString().split('T')[0]}
        } else if (filter == "this year") {
            var startYear = startOfYear(today)
            var endYear = endOfYear(today)
            data = {"from": startYear.toISOString().split('T')[0], "to": endYear.toISOString().split('T')[0]}
        }

        TaskService.getStats(data).then(
            response => {
                setContent(response.data);
            },
            error => {
                const resMessage = 
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                console.log(resMessage);
            }
        )
    }, [filter]);

  return (
    <Card>
        <CardContent>
            <Grid container spacing={3} justifyContent="space-between" alignItems="center">
                <Grid container item direction="row" justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="h5" sx={{fontWeight: 600}}>Todo</Typography>
                    </Grid>
                    <Grid item>
                        <Select variant="standard" value={filter} onChange={(e) => setFilter(e.target.value)}>
                            <MenuItem value={"all time"}>All time</MenuItem>
                            <MenuItem value={"this week"}>This week</MenuItem>
                            <MenuItem value={"last week"}>Last week</MenuItem>
                            <MenuItem value={"last six months"}>Last six months</MenuItem>
                            <MenuItem value={"this year"}>This year</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
                <Grid item>
                    {content &&
                    <>
                        <Typography variant="h5" sx={{fontWeight: 500}}>{content.not_done}</Typography> 
                        <Typography color="text.secondary">Not done</Typography>
                    </>
                    }
                </Grid>
                <Grid item>
                    {content &&
                    <>
                        <Typography variant="h5" sx={{fontWeight: 500}}>{content.completed}</Typography> 
                        <Typography color="text.secondary">Done</Typography>
                    </>
                    }
                </Grid>
                <Grid item>
                    {content &&
                        <CircularProgressWithLabel size={80} value={~~(content.completed / (content.completed + content.not_done) * 100)} sx={{borderRadius: "100%", boxShadow: "inset 0 0 0px 6.5px gray", backgroundColor: "transparent"}}/>
                    }
                </Grid>
                <Grid item xs={12}>
                    {content &&
                        <LinearProgress variant="determinate" value={content.completed / (content.completed + content.not_done) * 100}/>
                    }
                </Grid>
            </Grid>
        </CardContent>
    </Card>
  )
}

export default TodoCard