import { createFileRoute } from "@tanstack/react-router";
import { Kitchen } from "@/components/kitchen";

export const Route = createFileRoute("/")({ component: Kitchen });
