import React, { useEffect, useState } from "react";
import axios from "axios";
import {Card, CardContent, Typography, CircularProgress, Grid, Box, Avatar, Stack,} from "@mui/material";
import { CreditCard, MonetizationOn, CalendarToday } from "@mui/icons-material";
import Theme, { GlobleVariable } from "../../../Theme";

const PaymentHistory = ({ userid }) => {
    const Backend_url = GlobleVariable.Backend_url;

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPaymentHistory = async () => {
            try {
                const response = await axios.get(`${Backend_url}/payment/history/${userid}`);
                const sortedHistory = response.data.getuser.sort(
                    (a, b) => new Date(b.payment_time) - new Date(a.payment_time)
                );
                setHistory(sortedHistory);
            } catch (err) {
                setError("Failed to fetch payment history");
            } finally {
                setLoading(false);
            }
        };

        if (userid) {
            fetchPaymentHistory();
        }
    }, [userid]);

    if (loading)
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress color="primary" />
            </Box>
        );
    
    if (error)
        return (
            <Typography color="error" align="center" variant="h6" mt={2}>
                {error}
            </Typography>
        );

    return (
        <Grid container spacing={3} mt={3} justifyContent="center">
            <Grid item xs={12}>
                <Typography variant="h5" align="center" fontWeight="bold" color={Theme.white[100]}>
                    Payment History
                </Typography>
            </Grid>
            {history.length > 0 ? (
                history.map((payment, index) => (
                    <Grid item xs={12} sm={6} md={4} key={payment._id}>
                        <Card sx={{ backgroundColor: Theme.primary[50], color: Theme.white[100], p: 2, borderRadius: 3 }}>
                            <CardContent>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Avatar sx={{ bgcolor: Theme.secondary[100] }}>
                                        <CreditCard />
                                    </Avatar>
                                    <Box>
                                        <Typography variant="h6" fontWeight="bold">
                                            ₹{payment.amount}
                                        </Typography>
                                        <Typography variant="body2" color={Theme.white[200]}>
                                            Credits: {payment.credit}
                                        </Typography>
                                        <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                                            <CalendarToday fontSize="small" />
                                            <Typography variant="body2">
                                                {new Date(payment.payment_time).toLocaleDateString()}
                                            </Typography>
                                        </Stack>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))
            ) : (
                <Grid item xs={12}>
                    <Typography align="center" color={Theme.white[100]} variant="h6">
                        No Payment History Found
                    </Typography>
                </Grid>
            )}
        </Grid>
    );
};

export default PaymentHistory;
