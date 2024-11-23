"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/types/types";
import Image from "next/image";

type UserOrderProps = {
  orders: Order[] | undefined;
};

const UserOrder: React.FC<UserOrderProps> = ({ orders }) => {
  if (!orders || orders.length === 0) {
    return (
      <p className="text-center text-muted-foreground mt-4">No orders found.</p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {orders.map((order) => (
        <Card key={order.id} className="shadow-md">
          <CardHeader>
            <CardTitle>
              Order #{order.id}{" "}
              <Badge className="ml-2" variant="outline">
                {order.status.replace("_", " ")}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              <span className="font-medium">Total Price:</span> $
              {order.totalPrice.toFixed(2)}
            </p>
            <div>
              <p className="font-medium text-muted-foreground mb-2">Items:</p>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border-b pb-2 last:border-none"
                  >
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      width={200}
                      height={200}
                      className="rounded-md w-[100px] h-[100px] object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.quantity} x ${item.product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserOrder;
