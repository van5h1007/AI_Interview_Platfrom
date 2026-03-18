
import { Glow, GlowArea } from "@/components/glow";
import { Button } from "@/components/ui/button";
import { auth } from "../../../auth";
import {
  CardFooter,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { BookCheck, Sparkles, Calendar, Users, Clock, Star, Zap, Trophy } from "lucide-react";
import { Playwrite_BE_VLG } from "next/font/google";

export default async function Pricing() {
  const session = await auth();
  console.log(!session?.user)

  return (
    <section className="py-10 mt-20 ">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">AI-Powered Interview Preparation</h1>
        <p className="text-xl text-muted-foreground">Choose the perfect plan for your interview success</p>
      </div>
      <GlowArea className="flex gap-8 items-center justify-center lg:py-20 flex-col lg:flex-row">
        <Glow color="lightblue" className="rounded-xl  transition-transform ">
          <Card className="w-72 rounded-xl h-96 bg-black/35">
            <CardHeader>
              <CardTitle>Starter Plan</CardTitle>
              <CardDescription className="max-w-sm">
                Try our AI interview preparation features
                <div className="text-2xl font-bold mt-2">Free</div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <BookCheck className="text-foreground" size={20} />
                  <span>3 AI Mock Interviews</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Clock className="text-foreground" size={20} />
                  <span>15-minute Sessions</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Users className="text-foreground" size={20} />
                  <span>Basic Question Bank</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" className="w-full">Start Free</Button>
            </CardFooter>
          </Card>
        </Glow>

        <Glow color="lightblue" className="rounded-xl transition-transform">
          <Card className="max-w-md rounded-xl border-2 bg-black/35">
            <CardHeader>
              <div className="">MOST POPULAR</div>
              <CardTitle>Pro Plan</CardTitle>
              <CardDescription className="max-w-sm">
                Advanced AI-powered interview preparation
                <div className="text-2xl font-bold mt-2 text-primary">$49/month</div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <Sparkles className="text-foreground" size={20} />
                  <span>Unlimited AI Mock Interviews</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Calendar className="text-foreground" size={20} />
                  <span>60-minute Sessions</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Users className="text-foreground" size={20} />
                  <span>AI-Powered Feedback</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Trophy className="text-foreground" size={20} />
                  <span>Industry-specific Interview Tracks</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Zap className="text-foreground" size={20} />
                  <span>Advanced AI Analytics</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="w-full">Subscribe Now</Button>
            </CardFooter>
          </Card>
        </Glow>

        <Glow color="lightblue" className="rounded-xl transition-transform">
          <Card className="max-w-sm rounded-xl h-96 bg-black/35">
            <CardHeader>
              <CardTitle>Enterprise Plan</CardTitle>
              <CardDescription className="max-w-sm">
                Custom AI solutions for organizations
                <div className="text-2xl font-bold mt-2">Custom Pricing</div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <Sparkles className="text-foreground" size={20} />
                  <span>Everything in Pro Plan</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Users className="text-foreground" size={20} />
                  <span>Dedicated Account Manager</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Star className="text-foreground" size={20} />
                  <span>Custom AI Model Training</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Zap className="text-foreground" size={20} />
                  <span>API Access</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" className="w-full">Contact Sales</Button>
            </CardFooter>
          </Card>
        </Glow>
      </GlowArea>
    </section>
  );
}