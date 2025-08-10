import type { Metadata } from "next";
import { CodeBlock } from "@/components/code-block";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/section-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Rocket, Cloud, Server, Shield, Monitor } from "lucide-react";

export const metadata: Metadata = {
  title: "Deployment",
  description:
    "Learn how to deploy Qlik TypeScript SDK applications to production environments",
};

export default function DeploymentPage() {
  return (
    <div className="space-y-8 page-transition">
      <SectionHeader
        title="Deployment"
        description="Deploy your Qlik TypeScript SDK applications to production environments with confidence using best practices and proven strategies."
      />

      {/* Browser-Only Notice */}
      <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/50">
        <CardHeader>
          <CardTitle className="text-blue-800 dark:text-blue-200 flex items-center gap-2">
            🌐 Browser-Only Deployment
          </CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700 dark:text-blue-300">
          <p className="mb-3">
            The Qlik TypeScript SDK is designed exclusively for <strong>browser environments</strong>. 
            All deployment strategies focus on client-side applications that run in modern browsers.
          </p>
          <div className="text-sm space-y-1">
            <div><strong>✅ Supported:</strong> Static site hosting, CDN deployment, client-side applications</div>
            <div><strong>✅ Environments:</strong> Qlik Cloud, Qlik Sense Enterprise</div>
            <div><strong>❌ Not supported:</strong> Node.js server-side execution, server-side rendering</div>
          </div>
        </CardContent>
      </Card>

      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5" />
            Deployment Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Deploying Qlik applications requires careful consideration of
            security, performance, environment configuration, and monitoring.
            This guide covers deployment strategies for various hosting
            platforms and environments.
          </p>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">
                <Cloud className="h-3 w-3 mr-1" />
                Cloud Platforms
              </Badge>
              <div className="text-sm text-muted-foreground">
                AWS, Azure, GCP, Vercel, Netlify
              </div>
            </div>

            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">
                <Server className="h-3 w-3 mr-1" />
                On-Premise
              </Badge>
              <div className="text-sm text-muted-foreground">
                Docker, Kubernetes, traditional servers
              </div>
            </div>

            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">
                <Shield className="h-3 w-3 mr-1" />
                Security
              </Badge>
              <div className="text-sm text-muted-foreground">
                HTTPS, secrets management, authentication
              </div>
            </div>

            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">
                <Rocket className="h-3 w-3 mr-1" />
                CI/CD
              </Badge>
              <div className="text-sm text-muted-foreground">
                Automated testing and deployment
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Production Checklist */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">
          Production Readiness Checklist
        </h2>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pre-Deployment Checklist</CardTitle>
            <CardDescription>
              Essential items to verify before deploying to production
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h4 className="font-semibold text-green-700">✅ Security</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>HTTPS enforced for all connections</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>Environment variables for sensitive data</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>Web Integration ID properly configured</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>CORS origins whitelist configured</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>Authentication error handling implemented</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-blue-700">📊 Performance</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>Caching strategies implemented</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>Bundle optimization and code splitting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>Lazy loading for large datasets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>Error boundaries implemented</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>Performance monitoring configured</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-purple-700">🧪 Testing</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>{`Unit tests pass with > 80% coverage`}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>Integration tests with Qlik APIs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>End-to-end testing completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>Cross-browser compatibility tested</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>Mobile responsiveness verified</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-orange-700">
                  ⚙️ Configuration
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>Environment-specific configurations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>Logging and monitoring setup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>Health check endpoints implemented</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>Backup and recovery procedures</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>Documentation updated</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Deployment Strategies */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Cloud className="h-5 w-5" />
          Deployment Strategies
        </h2>

        <Tabs defaultValue="vercel" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="vercel">Vercel</TabsTrigger>
            <TabsTrigger value="aws">AWS</TabsTrigger>
            <TabsTrigger value="docker">Docker</TabsTrigger>
            <TabsTrigger value="kubernetes">Kubernetes</TabsTrigger>
          </TabsList>

          <TabsContent value="vercel" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Vercel Deployment</CardTitle>
                <CardDescription>
                  Deploy Next.js Qlik applications to Vercel
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-semibold">
                    1. Environment Configuration
                  </h4>
                  <CodeBlock language="bash">
                    {`# .env.local (for local development)
QLIK_HOST=your-tenant.us.qlikcloud.com
QLIK_WEB_INTEGRATION_ID=your-web-integration-id
NEXT_PUBLIC_APP_ENV=development

# .env.production (Vercel environment variables)
QLIK_HOST=prod-tenant.us.qlikcloud.com
QLIK_WEB_INTEGRATION_ID=prod-web-integration-id
NEXT_PUBLIC_APP_ENV=production`}
                  </CodeBlock>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">2. Vercel Configuration</h4>
                  <CodeBlock language="json">
                    {`// vercel.json
{
  "build": {
    "env": {
      "QLIK_HOST": "@qlik-host",
      "QLIK_WEB_INTEGRATION_ID": "@qlik-web-integration-id"
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/",
      "has": [
        {
          "type": "host",
          "value": "(?<host>.*)"
        }
      ],
      "destination": "https://your-domain.vercel.app",
      "permanent": false
    }
  ]
}`}
                  </CodeBlock>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">3. Deployment Script</h4>
                  <CodeBlock language="bash">
                    {`#!/bin/bash
# deploy.sh

echo "🚀 Starting Vercel deployment..."

# Set environment variables in Vercel
vercel env add QLIK_HOST production
vercel env add QLIK_WEB_INTEGRATION_ID production

# Build and deploy
vercel build --prod
vercel deploy --prod

echo "✅ Deployment completed!"

# Verify deployment
curl -f https://your-app.vercel.app/api/health || exit 1
echo "✅ Health check passed!"`}
                  </CodeBlock>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">
                    4. GitHub Actions Integration
                  </h4>
                  <CodeBlock language="yaml">
                    {`# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Build application
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-args: '--prod'
          vercel-org-id: \${{ secrets.ORG_ID }}
          vercel-project-id: \${{ secrets.PROJECT_ID }}`}
                  </CodeBlock>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="aws" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AWS Deployment</CardTitle>
                <CardDescription>
                  Deploy using AWS services (S3, CloudFront, Lambda)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-semibold">1. AWS CDK Configuration</h4>
                  <CodeBlock language="typescript">
                    {`// cdk/qlik-app-stack.ts
import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class QlikAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3 bucket for static assets
    const siteBucket = new s3.Bucket(this, 'QlikAppBucket', {
      bucketName: 'qlik-app-frontend',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'error.html',
      publicReadAccess: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
    });

    // Lambda function for API endpoints
    const apiLambda = new lambda.Function(this, 'QlikApiFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('dist'),
      environment: {
        QLIK_HOST: process.env.QLIK_HOST!,
        QLIK_WEB_INTEGRATION_ID: process.env.QLIK_WEB_INTEGRATION_ID!,
      },
      timeout: cdk.Duration.seconds(30),
    });

    // CloudFront distribution
    const distribution = new cloudfront.CloudFrontWebDistribution(this, 'QlikAppDistribution', {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: siteBucket
          },
          behaviors: [
            {
              isDefaultBehavior: true,
              compress: true,
              allowedMethods: cloudfront.CloudFrontAllowedMethods.GET_HEAD_OPTIONS,
              cachedMethods: cloudfront.CloudFrontAllowedCachedMethods.GET_HEAD_OPTIONS,
              viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            }
          ]
        }
      ],
      errorConfigurations: [
        {
          errorCode: 404,
          responseCode: 200,
          responsePagePath: '/index.html',
          errorCachingMinTtl: 86400,
        }
      ]
    });

    new cdk.CfnOutput(this, 'WebsiteURL', {
      value: distribution.distributionDomainName,
      description: 'Website URL'
    });
  }
}`}
                  </CodeBlock>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">2. Deployment Pipeline</h4>
                  <CodeBlock language="yaml">
                    {`# buildspec.yml for AWS CodeBuild
version: 0.2

phases:
  install:
    runtime-versions:
      nodejs: 18
    commands:
      - npm install -g aws-cdk
      
  pre_build:
    commands:
      - echo Logging in to Amazon ECR...
      - npm install
      
  build:
    commands:
      - echo Build started on \`date\`
      - npm run build
      - npm run test
      - cdk synth
      
  post_build:
    commands:
      - echo Build completed on \`date\`
      - cdk deploy --require-approval never
      - aws s3 sync ./out s3://\$S3_BUCKET --delete
      - aws cloudfront create-invalidation --distribution-id \$DISTRIBUTION_ID --paths "/*"

artifacts:
  files:
    - '**/*'`}
                  </CodeBlock>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="docker" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Docker Deployment</CardTitle>
                <CardDescription>
                  Containerized deployment with Docker
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-semibold">1. Multi-Stage Dockerfile</h4>
                  <CodeBlock language="dockerfile">
                    {`# Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production image
FROM node:18-alpine AS runner

WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/out ./out
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Set ownership
RUN chown -R nextjs:nodejs /app
USER nextjs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:3000/api/health || exit 1

EXPOSE 3000
ENV PORT 3000
ENV NODE_ENV production

CMD ["npm", "start"]`}
                  </CodeBlock>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">2. Docker Compose</h4>
                  <CodeBlock language="yaml">
                    {`# docker-compose.yml
version: '3.8'

services:
  qlik-app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - QLIK_HOST=\${QLIK_HOST}
      - QLIK_WEB_INTEGRATION_ID=\${QLIK_WEB_INTEGRATION_ID}
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    networks:
      - qlik-network

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/ssl/certs:ro
    depends_on:
      - qlik-app
    restart: unless-stopped
    networks:
      - qlik-network

networks:
  qlik-network:
    driver: bridge`}
                  </CodeBlock>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">
                    3. Production Deployment Script
                  </h4>
                  <CodeBlock language="bash">
                    {`#!/bin/bash
# deploy-docker.sh

set -e

echo "🐳 Starting Docker deployment..."

# Load environment variables
source .env.production

# Build and tag image
docker build -t qlik-app:latest .
docker tag qlik-app:latest qlik-app:\$(date +%Y%m%d-%H%M%S)

# Stop existing containers
docker-compose down

# Start new containers
docker-compose up -d

# Wait for health check
echo "⏳ Waiting for application to be healthy..."
timeout 60s bash -c 'until curl -f http://localhost/api/health; do sleep 2; done'

echo "✅ Deployment successful!"

# Clean up old images
docker image prune -f

echo "🧹 Cleanup completed!"`}
                  </CodeBlock>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="kubernetes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Kubernetes Deployment</CardTitle>
                <CardDescription>
                  Scalable deployment with Kubernetes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-semibold">1. Kubernetes Manifests</h4>
                  <CodeBlock language="yaml">
                    {`# k8s/deployment.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: qlik-app
  labels:
    app: qlik-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: qlik-app
  template:
    metadata:
      labels:
        app: qlik-app
    spec:
      containers:
      - name: qlik-app
        image: qlik-app:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: QLIK_HOST
          valueFrom:
            secretKeyRef:
              name: qlik-secrets
              key: host
        - name: QLIK_WEB_INTEGRATION_ID
          valueFrom:
            secretKeyRef:
              name: qlik-secrets
              key: web-integration-id
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /api/ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5

---
apiVersion: v1
kind: Service
metadata:
  name: qlik-app-service
spec:
  selector:
    app: qlik-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: ClusterIP

---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: qlik-app-ingress
  annotations:
    kubernetes.io/ingress.class: "nginx"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  tls:
  - hosts:
    - qlik-app.your-domain.com
    secretName: qlik-app-tls
  rules:
  - host: qlik-app.your-domain.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: qlik-app-service
            port:
              number: 80`}
                  </CodeBlock>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">2. Secrets Management</h4>
                  <CodeBlock language="yaml">
                    {`# k8s/secrets.yml
apiVersion: v1
kind: Secret
metadata:
  name: qlik-secrets
type: Opaque
stringData:
  host: "your-tenant.us.qlikcloud.com"
  web-integration-id: "your-web-integration-id"

---
# k8s/configmap.yml
apiVersion: v1
kind: ConfigMap
metadata:
  name: qlik-config
data:
  NODE_ENV: "production"
  LOG_LEVEL: "info"
  CACHE_TTL: "300"`}
                  </CodeBlock>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">3. Helm Chart</h4>
                  <CodeBlock language="yaml">
                    {`# helm/qlik-app/values.yml
replicaCount: 3

image:
  repository: qlik-app
  pullPolicy: IfNotPresent
  tag: "latest"

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: true
  className: "nginx"
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
  hosts:
    - host: qlik-app.your-domain.com
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: qlik-app-tls
      hosts:
        - qlik-app.your-domain.com

resources:
  limits:
    cpu: 500m
    memory: 512Mi
  requests:
    cpu: 250m
    memory: 256Mi

autoscaling:
  enabled: true
  minReplicas: 3
  maxReplicas: 10
  targetCPUUtilizationPercentage: 80
  targetMemoryUtilizationPercentage: 80

nodeSelector: {}
tolerations: []
affinity: {}`}
                  </CodeBlock>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Monitoring & Observability */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Monitor className="h-5 w-5" />
          Monitoring & Observability
        </h2>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Production Monitoring Setup
            </CardTitle>
            <CardDescription>
              Implement comprehensive monitoring for your deployed application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock language="typescript">
              {`// utils/monitoring.ts
class ProductionMonitoring {
  private metricsEndpoint: string;
  private apiKey: string;

  constructor(config: { metricsEndpoint: string; apiKey: string }) {
    this.metricsEndpoint = config.metricsEndpoint;
    this.apiKey = config.apiKey;
  }

  // Application performance monitoring
  trackPageLoad(pageName: string, loadTime: number): void {
    this.sendMetric({
      type: 'performance',
      name: 'page_load',
      value: loadTime,
      tags: { page: pageName },
      timestamp: Date.now()
    });
  }

  trackQlikOperation(operation: string, duration: number, success: boolean): void {
    this.sendMetric({
      type: 'qlik_operation',
      name: operation,
      value: duration,
      tags: { success: success.toString() },
      timestamp: Date.now()
    });
  }

  trackError(error: Error, context: string): void {
    this.sendMetric({
      type: 'error',
      name: 'application_error',
      value: 1,
      tags: {
        error_type: error.name,
        context: context,
        message: error.message.substring(0, 100)
      },
      timestamp: Date.now()
    });
  }

  trackUserAction(action: string, metadata?: Record<string, any>): void {
    this.sendMetric({
      type: 'user_action',
      name: action,
      value: 1,
      tags: metadata || {},
      timestamp: Date.now()
    });
  }

  private async sendMetric(metric: any): Promise<void> {
    try {
      await fetch(this.metricsEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': \`Bearer \${this.apiKey}\`
        },
        body: JSON.stringify(metric)
      });
    } catch (error) {
      console.error('Failed to send metric:', error);
    }
  }
}

// Health check endpoint
// pages/api/health.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Check database connectivity (if applicable)
    // Check external service connectivity (Qlik)
    const qlikHealthy = await checkQlikConnectivity();
    
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV,
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      services: {
        qlik: qlikHealthy ? 'healthy' : 'unhealthy'
      }
    };

    const statusCode = qlikHealthy ? 200 : 503;
    res.status(statusCode).json(health);

  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}

async function checkQlikConnectivity(): Promise<boolean> {
  try {
    // Basic connectivity check to Qlik
    const response = await fetch(\`https://\${process.env.QLIK_HOST}/api/v1/users/me\`, {
      method: 'HEAD',
      timeout: 5000
    });
    return response.ok;
  } catch {
    return false;
  }
}`}
            </CodeBlock>
          </CardContent>
        </Card>
      </div>

      {/* Best Practices */}
      <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/50">
        <CardHeader>
          <CardTitle className="text-green-800 dark:text-green-200">
            🚀 Deployment Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-green-700 dark:text-green-300">
          <div>
            <strong>Security First:</strong> Always use HTTPS and secure secret
            management
          </div>
          <div>
            <strong>Environment Separation:</strong> Maintain separate
            configurations for dev/staging/production
          </div>
          <div>
            <strong>Automated Testing:</strong> Include comprehensive testing in
            your CI/CD pipeline
          </div>
          <div>
            <strong>Monitoring:</strong> Implement logging, metrics, and
            alerting from day one
          </div>
          <div>
            <strong>Scalability:</strong> Design for horizontal scaling and high
            availability
          </div>
          <div>
            <strong>Rollback Strategy:</strong> Always have a plan for rolling
            back deployments
          </div>
          <div>
            <strong>Performance:</strong> Optimize bundles, enable compression,
            and use CDNs
          </div>
          <div>
            <strong>Documentation:</strong> Maintain up-to-date deployment and
            runbook documentation
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
