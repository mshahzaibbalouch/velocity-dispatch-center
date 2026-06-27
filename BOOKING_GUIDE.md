# Booking Management System - Complete Guide

## Overview
The Velocity Dispatch Center now includes a comprehensive booking management system with full CRUD operations, status tracking, payment management, and analytics.

## Features

### 1. **Booking Creation**
- Create new bookings with passenger, pickup, and dropoff details
- Automatic or manual distance and price entry
- Support for different payment methods (Cash, Card, Wallet, Online)
- Estimated duration calculation

**How to Create a Booking:**
1. Click the "New Booking" button on the Booking Management page
2. Fill in the required fields:
   - Passenger ID (user ID of the passenger)
   - Pickup Location
   - Dropoff Location
   - Distance (in km)
   - Price
3. Optionally set:
   - Estimated Duration (auto-calculated if left blank)
   - Payment Method
   - Additional Notes
4. Click "Create Booking"

### 2. **Booking Status Tracking**
The system tracks bookings through multiple status stages:

#### Status Flow:
```
pending → confirmed → driver_assigned → driver_arrived → picked_up → in_transit → completed
                                         ↓
                                    dropped_out
                                    
Or at any point → cancelled
```

#### Available Status Updates:

- **Assign Driver**: Assign a driver to a pending/confirmed booking
- **Driver Arrived**: Mark driver as arrived at pickup location
- **Pickup Passenger**: Mark passenger as picked up
- **Start Transit**: Begin the trip to dropoff location
- **Drop Off**: Complete the ride
- **Mark as Dropped Out**: Handle no-shows (mark when driver arrives but passenger doesn't)
- **Cancel Booking**: Cancel booking with reason
- **Add Rating**: Rate completed bookings (1-5 stars with optional review)

### 3. **Booking Actions**
Click the three-dot menu next to any booking to see available actions based on current status.

#### Quick Status Actions:
- Eye icon: View complete booking details
- Menu icon: Additional status update options

### 4. **Booking Details View**
Click the eye icon to view comprehensive booking information:
- Booking ID and Status
- Passenger and Driver Information
- Route Details (Pickup/Dropoff locations, Distance, Duration)
- Trip Timing (Pickup time, Dropoff time, Actual duration)
- Payment Information (with ability to update status)
- Rating and Review (if available)
- Notes and Timestamps

### 5. **Filtering and Search**
- Filter bookings by status using the dropdown
- View bookings across multiple pages
- Sort and organize by various criteria

### 6. **Export to CSV**
- Click "Export CSV" button to download all bookings as a CSV file
- Includes all booking details:
  - Booking ID, Passenger/Driver info
  - Route and distance information
  - Status, payment details
  - Ratings and reviews
  - Timestamps

### 7. **Payment Management**
Edit payment information for any booking:
1. Click "View Details" for a booking
2. Click "Edit" in the Payment Information section
3. Update Payment Status: Pending → Completed → Refunded
4. Change Payment Method if needed
5. Click "Update"

### 8. **Rating and Reviews**
After a booking is completed:
1. Click the three-dot menu
2. Select "Add Rating"
3. Rate 1-5 stars
4. Optionally add a written review
5. Save

### 9. **Dashboard Statistics**
View real-time statistics:
- Total Bookings
- Completed Bookings
- In Progress Bookings
- Cancelled Bookings

## API Endpoints

### Create & List
- `POST /api/booking` - Create new booking
- `GET /api/booking` - List bookings (with pagination and filters)

### Individual Booking
- `GET /api/booking/[id]` - Get booking details
- `PATCH /api/booking/[id]` - Update booking details
- `DELETE /api/booking/[id]` - Delete booking

### Status Updates
- `POST /api/booking/[id]/assign-driver` - Assign driver
- `POST /api/booking/[id]/driver-arrived` - Driver arrived
- `POST /api/booking/[id]/pickup` - Passenger picked up
- `POST /api/booking/[id]/in-transit` - Trip in progress
- `POST /api/booking/[id]/dropoff` - Trip completed
- `POST /api/booking/[id]/cancelled` - Cancel booking
- `POST /api/booking/[id]/dropped-out` - Mark as dropped out

### Payment & Rating
- `PATCH /api/booking/[id]/payment` - Update payment info
- `PATCH /api/booking/[id]/rate` - Add rating and review

### Analytics
- `GET /api/booking/analytics` - Get booking statistics
- `GET /api/booking/[id]/stats` - Get individual booking stats

## Booking Schema

```javascript
{
  id: ObjectId,
  pickupLocation: String (required),
  dropLocation: String (required),
  passengerId: ObjectId (required),
  driverId: ObjectId (optional),
  price: Number (required),
  distance: Number (required),
  status: Enum[pending|confirmed|driver_assigned|driver_arrived|picked_up|in_transit|completed|cancelled|dropped_out|no_show],
  pickupTime: Date,
  dropoffTime: Date,
  estimatedDuration: Number (minutes),
  actualDuration: Number (minutes),
  paymentMethod: Enum[cash|card|wallet|online],
  paymentStatus: Enum[pending|completed|refunded],
  rating: Number (1-5),
  review: String,
  cancellationReason: String,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Common Use Cases

### Scenario 1: Creating and Completing a Booking
1. Create booking with passenger details
2. Assign driver using status actions
3. Mark driver as arrived
4. Pickup passenger
5. Start transit
6. Drop off passenger
7. Update payment status to completed
8. Add rating and review

### Scenario 2: Handling No-Shows
1. When driver arrives but passenger isn't there
2. Click status menu and select "Mark as Dropped Out"
3. Add notes about the situation
4. The booking is marked with dropped_out status

### Scenario 3: Cancelling a Booking
1. If booking needs to be cancelled
2. Click status menu and select "Cancel Booking"
3. Enter cancellation reason
4. Booking status changed to cancelled

### Scenario 4: Exporting Reports
1. Apply any filters (by status)
2. Click "Export CSV"
3. Download contains all filtered bookings
4. Can be opened in Excel/Google Sheets for analysis

## Features Summary

| Feature | Status |
|---------|--------|
| Create Bookings | ✅ |
| View All Bookings | ✅ |
| View Booking Details | ✅ |
| Update Booking Status | ✅ |
| Assign Drivers | ✅ |
| Track Trip Progress | ✅ |
| Payment Management | ✅ |
| Rating & Reviews | ✅ |
| CSV Export | ✅ |
| Analytics & Stats | ✅ |
| Booking Cancellation | ✅ |
| No-show Handling | ✅ |
| Pagination | ✅ |
| Filtering by Status | ✅ |

## Tips & Best Practices

1. **Always ensure passenger exists** before creating a booking
2. **Follow the status flow** - don't skip status stages for accurate tracking
3. **Update payment status** only after confirming payment received
4. **Add ratings** for completed bookings to build a rating database
5. **Export reports** regularly for analysis and audits
6. **Use notes field** for special instructions or issues
7. **Monitor cancelled bookings** to identify patterns

## Troubleshooting

### Booking Not Showing
- Check if filters are applied
- Verify page number/pagination
- Try refreshing the page

### Can't Assign Driver
- Ensure driver exists in the system with role='driver'
- Check that booking status is pending or confirmed

### Status Update Failed
- Verify current status allows the action
- Check the status flow rules
- Ensure required fields are present

### CSV Export Empty
- Create some bookings first
- Apply filters if needed
- Check browser console for errors

## Future Enhancements

- Real-time location tracking
- SMS/Email notifications
- Advanced analytics dashboard
- Booking templates
- Bulk operations
- API rate limiting
- Webhook support
- Multi-language support
