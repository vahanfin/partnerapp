'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Car, IndianRupee, Bell, LogOut, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Dummy data for demonstration
const challans = [
  {
    id: 1,
    challanNo: "CH123456",
    registrationNo: "MH01AB1234",
    price: 2000,
    date: "2024-01-15",
    location: "Mumbai Central",
    violation: "Speed Limit Exceeded",
    officer: "Officer John Doe"
  },
  {
    id: 2,
    challanNo: "CH123457",
    registrationNo: "MH01AB1234",
    price: 1500,
    date: "2024-01-14",
    location: "Bandra West",
    violation: "Red Light Violation",
    officer: "Officer Jane Smith"
  },
  {
    id: 3,
    challanNo: "CH123458",
    registrationNo: "MH01AB1234",
    price: 1000,
    date: "2024-01-13",
    location: "Andheri East",
    violation: "No Parking Zone",
    officer: "Officer Mike Johnson"
  },
  {
    id: 4,
    challanNo: "CH123459",
    registrationNo: "MH01AB1234",
    price: 500,
    date: "2024-01-12",
    location: "Dadar",
    violation: "No Helmet",
    officer: "Officer Sarah Wilson"
  }
];

export default function DashboardPage() {
  const router = useRouter();
  const [selectedChallan, setSelectedChallan] = useState<any>(null);
  const [bidAmount, setBidAmount] = useState<string>("");

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6" />
            <span className="font-bold text-xl">Challan Bidding</span>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer" />
            <Button variant="ghost" onClick={() => router.push('/')} size="icon">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Search Challan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Input placeholder="Enter vehicle number" className="max-w-md" />
                <Button>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Challans</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{challans.length}</div>
              <p className="text-xs text-muted-foreground">Active challans</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Amount Due</CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₹{challans.reduce((sum, challan) => sum + challan.price, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Total pending amount</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Bids</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">No active bids</p>
            </CardContent>
          </Card>
        </div>

        {/* Challans Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Challans</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Challan No.</TableHead>
                  <TableHead>Registration No.</TableHead>
                  <TableHead>Price (₹)</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {challans.map((challan) => (
                  <TableRow key={challan.id}>
                    <TableCell>{challan.challanNo}</TableCell>
                    <TableCell>{challan.registrationNo}</TableCell>
                    <TableCell>₹{challan.price.toLocaleString()}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedChallan(challan)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Challan Details Dialog */}
        <Dialog open={!!selectedChallan} onOpenChange={() => setSelectedChallan(null)}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">
                Challan Details
                <DialogClose asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-4 w-4" />
                  </Button>
                </DialogClose>
              </DialogTitle>
            </DialogHeader>
            {selectedChallan && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Challan No.</p>
                    <p>{selectedChallan.challanNo}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Registration No.</p>
                    <p>{selectedChallan.registrationNo}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Date</p>
                    <p>{selectedChallan.date}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Amount</p>
                    <p>₹{selectedChallan.price.toLocaleString()}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-muted-foreground">Location</p>
                    <p>{selectedChallan.location}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-muted-foreground">Violation</p>
                    <p>{selectedChallan.violation}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-muted-foreground">Officer</p>
                    <p>{selectedChallan.officer}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bidAmount">Your Bid Amount (₹)</Label>
                  <Input
                    id="bidAmount"
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    placeholder="Enter your bid amount"
                  />
                </div>
                <Button className="w-full" onClick={() => {
                  // Handle bid submission
                  setSelectedChallan(null);
                  setBidAmount("");
                }}>
                  Submit Bid
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}