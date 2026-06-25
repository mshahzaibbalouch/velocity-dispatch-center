import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const { client } = await connectToDatabase();
    
    // Test the connection by pinging the database
    await client.db('admin').command({ ping: 1 });
    
    return Response.json(
      {
        status: 'healthy',
        message: 'MongoDB connection successful',
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        status: 'error',
        message: 'Failed to connect to MongoDB',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
