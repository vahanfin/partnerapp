'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, Shield, IndianRupee } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6" />
            <span className="font-bold text-xl">Challan Bidding</span>
          </div>
          <div className="space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Register</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-6">
          Efficient Challan Payment Solution
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Pay your traffic challans at the best rates through our trusted partner network
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/register">Get Started</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/partner">Become a Partner</Link>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Car className="h-8 w-8 mb-2" />
              <CardTitle>Easy Challan Lookup</CardTitle>
              <CardDescription>
                Check your pending challans using vehicle number
              </CardDescription>
            </CardHeader>
            <CardContent>
              Instantly retrieve challan details from the Parivahan portal for any registered vehicle.
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <IndianRupee className="h-8 w-8 mb-2" />
              <CardTitle>Competitive Rates</CardTitle>
              <CardDescription>
                Get the best rates from our partner network
              </CardDescription>
            </CardHeader>
            <CardContent>
              Partners bid competitively to offer you the most attractive rates for challan payments.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-8 w-8 mb-2" />
              <CardTitle>Secure Payments</CardTitle>
              <CardDescription>
                Multiple payment options available
              </CardDescription>
            </CardHeader>
            <CardContent>
              Pay securely using UPI, credit/debit cards, or digital wallets through Razorpay.
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}