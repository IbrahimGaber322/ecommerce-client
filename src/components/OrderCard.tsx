import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Order from "../interfaces/Order";
import { Box } from "@mui/material";

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  const handleStepActivated = (status:string) => {
    switch (status) {
      case "PENDING":
        return 1;
      case "SHIPPED":
        return 2;
      case "DELIVERED":
        return 3;
      default:
        return 0;
    }
  };
  const isStepFailed = (status:string) => {
    return status === "CANCELED";
  };
  const steps = ['Placed order', 'Processing', 'Shipped','Deliverd'];
  const stepsNum = handleStepActivated(order.status);
  const formattedStartingDate = new Date(order?.starting_date).toLocaleString();
  const formattedEndinDate = new Date(order?.delivery_date).toLocaleString();
  return (
    <Card sx={{ mt: "2rem" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Order Details
        </Typography>
        <Stepper activeStep={stepsNum}>
          {steps.map((label, index) => {
            const labelProps: {
              optional?: React.ReactNode;
              error?: boolean;
            } = {};
            if (isStepFailed(order.status)) {
              labelProps.optional = (
                <Typography variant="caption" color="error">
                  Cancelled
                </Typography>
              );
              labelProps.error = true;
            }

            return (
              <Step key={label}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Typography variant="subtitle1">
          Order ID: {order.id}
        </Typography>
        <Typography variant="subtitle1">
          Starting Date: {String(formattedStartingDate)}
        </Typography>
        <Typography variant="subtitle1">
          Delivery Date: {String(formattedEndinDate)}
        </Typography>
        <Typography variant="subtitle1">
          Total Price: ${order?.total_price}
        </Typography>
        <Typography variant="subtitle1">
          Status: {order.status}
        </Typography>
        <Typography variant="subtitle1">
          Delivery Address: {order.address_name} - {order.address_mobile}
        </Typography>
        <Typography variant="body1">
          {order.address}
        </Typography>
        <Typography variant="body1">
          {order.address_desc}
        </Typography>
        <Typography variant="h5" sx={{ mt: '2rem' }} gutterBottom>
          Order Items
        </Typography>
        <List>
        {order.items.map((item, index) => (
          <Card key={index} variant="outlined" sx={{ borderRadius: 4, my: 1 }}>
            <ListItem>
              <ListItemText
                primary={item.product.name}
                secondary={`Quantity: ${item.quantity}, Price: $${item?.product?.price}`}
              />
            </ListItem>
          </Card>
        ))}
      </List>
      </CardContent>
    </Card>
  );
}
