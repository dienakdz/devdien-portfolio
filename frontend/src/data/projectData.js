import project1 from '../assets/optimized/project1.webp';
import project2 from '../assets/optimized/project2.webp';
import carShowroomImg from '../assets/car-showroom.jpg';
import veggieImg from '../assets/veggie.jpg';
import fastapiBookImg from '../assets/fastapi-book.jpg';

export const projectData = {
  vi: [
    {
      id: 'fastapi-book',
      layer: 'core-api',
      layerName: 'Core APIs & Dịch Vụ Cốt Lõi',
      title: 'FastAPI Book Management API',
      badge: 'Production RESTful API',
      summary:
        'RESTful API chuẩn production kiến trúc Clean Architecture với FastAPI, kết nối async PostgreSQL, SQLAlchemy ORM, phân quyền JWT và bộ unit test tự động.',
      problem:
        'Xây dựng dịch vụ API mở rộng cần kiến trúc sạch (clean architecture), dependency injection, connection pool tối ưu và bảo mật token xác thực.',
      solution:
        'Áp dụng FastAPI best practices: schema Pydantic v2, async database session, xác thực RBAC với JWT và đóng gói Docker hoàn chỉnh.',
      impact:
        'Đóng vai trò là kiến trúc tham chiếu mẫu cho việc xây dựng các REST service bằng Python có thông lượng cao và dễ bảo trì.',
      tech: ['FastAPI', 'Python 3.11', 'PostgreSQL', 'SQLAlchemy Async', 'Alembic', 'Docker', 'Pytest'],
      repoUrl: 'https://github.com/dienakdz/fastapi-book-management-api',
      liveUrl: null,
      status: 'Production API',
      image: fastapiBookImg,
      architecture: {
        poolSpecs: {
          maxConn: 100,
          idle: 10,
          timeout: '30s',
          driver: 'asyncpg',
        },
        endpoints: [
          { method: 'GET', path: '/api/v1/books', desc: 'Lấy danh mục sách kèm phân trang & lọc' },
          { method: 'POST', path: '/api/v1/books', desc: 'Thêm sách mới & upload ảnh bìa (multipart)' },
          { method: 'POST', path: '/api/v1/auth/login', desc: 'Xác thực tài khoản & cấp phát JWT token' },
        ],
      },
    },
    {
      id: 'devops-foundations',
      layer: 'devops',
      layerName: 'Hạ Tầng Cloud & DevOps',
      title: 'AWS DevOps Foundations Labs',
      badge: 'Container & Cloud IaC',
      summary:
        'Bộ lab thực hành DevOps chuẩn hóa kết nối toàn bộ quy trình: Docker containerization, Docker Compose cụm đa dịch vụ, Kubernetes manifests, Terraform AWS IaC và CI/CD pipeline.',
      problem:
        'Triển khai microservices hiện đại đòi hỏi môi trường triển khai có thể tái lập (reproducible), cô lập tài nguyên, cấu hình hạ tầng bằng mã nguồn (IaC) và tự động hóa release.',
      solution:
        'Chuẩn hóa hành trình triển khai từ Source Code → Docker Image → Docker Compose Local Stack → Kubernetes Manifests → Terraform AWS Infrastructure → CI/CD Pipeline.',
      impact:
        'Trở thành bộ khung hạ tầng mẫu áp dụng cho việc đóng gói, kiểm thử và bàn giao sản phẩm phần mềm lên môi trường Cloud an toàn.',
      tech: ['Docker Compose', 'Kubernetes', 'Terraform', 'AWS ECR', 'GitHub Actions', 'Nginx Reverse Proxy'],
      repoUrl: 'https://github.com/dienakdz/devops-foundations-labs',
      liveUrl: null,
      status: 'Cloud & Infrastructure',
      image: project2,
      architecture: {
        containers: [
          { name: 'Nginx Proxy', port: '80/443', role: 'Reverse Proxy & SSL Termination' },
          { name: 'API Service', port: '8000', role: 'Backend Application (FastAPI/Node)' },
          { name: 'PostgreSQL', port: '5432', role: 'Relational Persistent Storage' },
          { name: 'Redis Cache', port: '6379', role: 'In-Memory Cache & Session Broker' },
        ],
        pipelineSteps: ['Source Git', 'Docker Build', 'Compose Cluster', 'K8s Cluster', 'Terraform AWS', 'CI/CD Flow'],
      },
    },
    {
      id: 'veggie-logistics',
      layer: 'logistics',
      layerName: 'Thương Mại & Logistics',
      title: 'Veggie Organic E-Commerce & GHN Logistics',
      badge: 'E-Commerce & Vận Chuyển',
      summary:
        'Nền tảng thương mại điện tử thực phẩm sạch với tích hợp giao vận Giao Hàng Nhanh (GHN API), quản lý máy trạng thái đơn hàng (Order State Machine) và đồng bộ tồn kho bám sát.',
      problem:
        'Cửa hàng cần luồng checkout tự động, tính cước phí vận chuyển chính xác theo trọng lượng/địa chỉ và đồng bộ trạng thái đơn hàng thời gian thực với đối tác giao vận.',
      solution:
        'Thiết kế backend cho catalog sản phẩm, checkout, tích hợp API Giao Hàng Nhanh (GHN) nhận webhook cập nhật trạng thái vận đơn và đối soát tồn kho tự động.',
      impact:
        'Tối ưu hóa quy trình xử lý đơn hàng và đảm bảo tính nhất quán dữ liệu giữa cửa hàng online và đơn vị giao vận hàng đầu.',
      tech: ['Laravel 9', 'PHP 8', 'MySQL', 'GHN API', 'Webhooks', 'Docker', 'TailwindCSS'],
      repoUrl: 'https://github.com/dienakdz/veggie',
      liveUrl: null,
      status: 'E-Commerce Logistics',
      image: veggieImg,
      architecture: {
        webhooks: [
          { name: 'GHN Order Status Webhook', status: '200 OK', latency: '18ms' },
          { name: 'Inventory Reconciliation Worker', status: 'Active', latency: 'Sync' },
        ],
        orderSteps: ['Khởi tạo đơn', 'Xác thực thanh toán', 'Phát hành vận đơn GHN', 'Đang vận chuyển', 'Giao thành công'],
      },
    },
    {
      id: 'travela',
      layer: 'recommender',
      layerName: 'Giao Dịch Đặt Tour & Gợi Ý AI',
      title: 'Travela Tour Booking & Recommendation Platform',
      badge: 'Tour Booking & Microservice',
      summary:
        'Nền tảng đặt tour trực tuyến tập trung vào quy trình đặt chỗ nhiều trạng thái, xuất hóa đơn PDF tự động, cổng thanh toán MoMo/PayPal và tích hợp microservice gợi ý điểm đến bằng Python.',
      problem:
        'Quy trình đặt tour nhiều bước dễ gây nghẽn dữ liệu và nguy cơ race condition khi nhiều người cùng đặt một slot, trong khi khách hàng cần gợi ý lộ trình thông minh.',
      solution:
        'Xây dựng luồng booking bảo đảm tính toàn vẹn giao dịch bằng Laravel & MySQL, tích hợp engine Python độc lập xử lý logic gợi ý tour du lịch theo sở thích.',
      impact:
        'Tạo nền tảng backend vững chắc kết hợp giữa hệ thống quản lý giao dịch transactional và dịch vụ phân tích dữ liệu chuyên biệt.',
      tech: ['Laravel 9', 'PHP 8', 'Python Microservice', 'MySQL', 'MoMo Sandbox', 'PayPal SDK', 'Dompdf'],
      repoUrl: 'https://github.com/dienakdz/travela',
      liveUrl: null,
      status: 'Tour & Recommendation',
      image: project1,
      architecture: {
        flowSteps: ['Chọn tour & số lượng', 'Khóa giữ chỗ (Lock Slot)', 'Thanh toán MoMo / PayPal', 'Xuất vé PDF & Gửi Email', 'Python Recommender (:5555)'],
        stats: {
          recommendEngine: 'Python Microservice',
          invoiceEngine: 'Dompdf PDF Generator',
          paymentGateways: 'MoMo + PayPal SDK',
        },
      },
    },
    {
      id: 'car-showroom',
      layer: 'database',
      layerName: 'Cơ Sở Dữ Liệu & EAV',
      title: 'Car Showroom & Vehicle Inventory EAV System',
      badge: 'EAV Dynamic Schema',
      summary:
        'Nền tảng quản lý showroom ô tô & kho xe: Danh mục xe phân cấp đa tầng (Makes/Models/Trims), thuộc tính động EAV, theo dõi kho xe và tiếp nhận leads khách hàng.',
      problem:
        'Quản lý showroom xe hơi đòi hỏi mô hình dữ liệu quan hệ phức tạp giữa hãng xe, dòng xe, phiên bản, thông số kỹ thuật tùy biến và quản lý trạng thái giữ chỗ.',
      solution:
        'Xây dựng hệ thống backend với Laravel & MySQL, thiết kế cấu trúc phân cấp Makes/Models/Trims, lưu trữ thuộc tính động EAV, lịch sử biến động giá và đặt lịch hẹn lái thử.',
      impact:
        'Cung cấp quy trình vận hành toàn diện cho showroom từ lúc nhập kho phương tiện đến khi tiếp nhận lead và chốt giao dịch.',
      tech: ['Laravel', 'PHP', 'MySQL', 'EAV Model', 'Docker', 'TailwindCSS'],
      repoUrl: 'https://github.com/dienakdz/car-showroom',
      liveUrl: null,
      status: 'EAV Showroom',
      image: carShowroomImg,
      architecture: {
        schemaLevels: ['Hãng xe (Makes)', 'Dòng xe (Models)', 'Phiên bản (Trims)', 'Thuộc tính động EAV (Màu, Động cơ, Tiện nghi)', 'Kho xe & Lịch hẹn'],
      },
    },
  ],
  en: [
    {
      id: 'fastapi-book',
      layer: 'core-api',
      layerName: 'Core APIs & Services',
      title: 'FastAPI Book Management API',
      badge: 'Production RESTful API',
      summary:
        'Production-ready RESTful service architected with Clean Architecture principles using FastAPI, async PostgreSQL, SQLAlchemy ORM, JWT role-based security, and automated Pytest integration test suites.',
      problem:
        'Building scalable API services requires clean architecture, dependency injection, reliable database connection pooling, and secure token validation.',
      solution:
        'Structured with FastAPI best practices: Pydantic v2 schemas, async database sessions, role-based access control, and Dockerized dev environment.',
      impact:
        'Serves as the reference architecture for building clean, maintainable, and high-throughput Python REST services.',
      tech: ['FastAPI', 'Python 3.11', 'PostgreSQL', 'SQLAlchemy Async', 'Alembic', 'Docker', 'Pytest'],
      repoUrl: 'https://github.com/dienakdz/fastapi-book-management-api',
      liveUrl: null,
      status: 'Production API',
      image: fastapiBookImg,
      architecture: {
        poolSpecs: {
          maxConn: 100,
          idle: 10,
          timeout: '30s',
          driver: 'asyncpg',
        },
        endpoints: [
          { method: 'GET', path: '/api/v1/books', desc: 'List books with pagination & filter' },
          { method: 'POST', path: '/api/v1/books', desc: 'Create book with cover upload (multipart)' },
          { method: 'POST', path: '/api/v1/auth/login', desc: 'Authenticate account & issue JWT' },
        ],
      },
    },
    {
      id: 'devops-foundations',
      layer: 'devops',
      layerName: 'Cloud Infrastructure & DevOps',
      title: 'AWS DevOps Foundations Labs',
      badge: 'Container & Cloud IaC',
      summary:
        'Hands-on DevOps engineering labs connecting the entire deployment lifecycle: Docker containerization, Docker Compose multi-service clusters, Kubernetes manifests, Terraform AWS IaC, and CI/CD pipelines.',
      problem:
        'Deploying modern microservices demands repeatable, secure, and automated delivery pipelines with zero downtime and strict resource boundaries.',
      solution:
        'Standardized deployment journey from Source Code → Docker Image → Docker Compose Local Stack → Kubernetes Manifests → Terraform AWS Infrastructure → CI/CD Pipeline.',
      impact:
        'Serves as the reusable infrastructure blueprint applied across all backend production deployments and cloud infrastructure.',
      tech: ['Docker Compose', 'Kubernetes', 'Terraform', 'AWS ECR', 'GitHub Actions', 'Nginx Reverse Proxy'],
      repoUrl: 'https://github.com/dienakdz/devops-foundations-labs',
      liveUrl: null,
      status: 'Cloud & Infrastructure',
      image: project2,
      architecture: {
        containers: [
          { name: 'Nginx Proxy', port: '80/443', role: 'Reverse Proxy & SSL Termination' },
          { name: 'API Service', port: '8000', role: 'Backend Application (FastAPI/Node)' },
          { name: 'PostgreSQL', port: '5432', role: 'Relational Persistent Storage' },
          { name: 'Redis Cache', port: '6379', role: 'In-Memory Cache & Session Broker' },
        ],
        pipelineSteps: ['Source Git', 'Docker Build', 'Compose Cluster', 'K8s Cluster', 'Terraform AWS', 'CI/CD Flow'],
      },
    },
    {
      id: 'veggie-logistics',
      layer: 'logistics',
      layerName: 'Enterprise & Logistics',
      title: 'Veggie Organic E-Commerce & GHN Logistics',
      badge: 'E-Commerce & Logistics',
      summary:
        'An e-commerce platform for organic food retail with real-time Giao Hang Nhanh (GHN) delivery logistics integration, Order State Machine orchestration, and inventory-aware checkout.',
      problem:
        'The retail shop needed seamless order orchestration, shipping fee calculations based on address and weight, and tight synchronization between catalog and stock data.',
      solution:
        'Implemented backend workflows for product catalog, checkout, Giao Hang Nhanh (GHN) delivery APIs, webhook order tracking, and inventory reconciliation.',
      impact:
        'Streamlined order fulfillment and kept inventory accurate across online sales and logistics partners.',
      tech: ['Laravel 9', 'PHP 8', 'MySQL', 'GHN API', 'Webhooks', 'Docker', 'TailwindCSS'],
      repoUrl: 'https://github.com/dienakdz/veggie',
      liveUrl: null,
      status: 'E-Commerce Logistics',
      image: veggieImg,
      architecture: {
        webhooks: [
          { name: 'GHN Order Status Webhook', status: '200 OK', latency: '18ms' },
          { name: 'Inventory Reconciliation Worker', status: 'Active', latency: 'Sync' },
        ],
        orderSteps: ['Order Created', 'Payment Validated', 'GHN Waybill Issued', 'In Transit', 'Delivered & Reconciled'],
      },
    },
    {
      id: 'travela',
      layer: 'recommender',
      layerName: 'Tour Transactions & Recommender',
      title: 'Travela Tour Booking & Recommendation Platform',
      badge: 'Tour Booking & Microservice',
      summary:
        'A full-featured tour booking and travel management platform focused on robust multi-step reservation flows, transactional integrity, automated PDF invoice generation, and a standalone Python recommendation engine.',
      problem:
        'The tour reservation journey involved multiple steps with concurrency risks, while travel operators needed clear visibility into schedules and trip allocations.',
      solution:
        'Built transactional booking workflows with Laravel and MySQL, combined with Python-powered data handling for destination recommendation models.',
      impact:
        'Created a reliable backend foundation that scales seamlessly for booking states, reporting, and third-party payment gateways.',
      tech: ['Laravel 9', 'PHP 8', 'Python Microservice', 'MySQL', 'MoMo Sandbox', 'PayPal SDK', 'Dompdf'],
      repoUrl: 'https://github.com/dienakdz/travela',
      liveUrl: null,
      status: 'Tour & Recommendation',
      image: project1,
      architecture: {
        flowSteps: ['Select Tour', 'Lock Slot', 'MoMo / PayPal Gateway', 'Issue PDF & Email', 'Python Recommender (:5555)'],
        stats: {
          recommendEngine: 'Python Microservice',
          invoiceEngine: 'Dompdf PDF Generator',
          paymentGateways: 'MoMo + PayPal SDK',
        },
      },
    },
    {
      id: 'car-showroom',
      layer: 'database',
      layerName: 'Database & EAV Model',
      title: 'Car Showroom & Vehicle Inventory EAV System',
      badge: 'EAV Dynamic Schema',
      summary:
        'A comprehensive automotive dealership platform and vehicle inventory management system featuring multi-tier catalogs, dynamic EAV attributes, and CRM lead capture.',
      problem:
        'Managing automotive dealerships requires complex relational modeling across makes, models, trims, dynamic specifications, and synchronizing vehicle hold states.',
      solution:
        'Architected a robust Laravel & MySQL backend with multi-table catalog hierarchy, EAV attribute values, inventory price tracking, and appointment scheduling workflows.',
      impact:
        'Provides a complete dealership workflow engine handling vehicles from intake to customer test-drive booking and sales.',
      tech: ['Laravel', 'PHP', 'MySQL', 'EAV Model', 'Docker', 'TailwindCSS'],
      repoUrl: 'https://github.com/dienakdz/car-showroom',
      liveUrl: null,
      status: 'EAV Showroom',
      image: carShowroomImg,
      architecture: {
        schemaLevels: ['Makes Table', 'Models Hierarchy', 'Trims & Specs', 'EAV Dynamic Attributes (Color, Engine, Trans)', 'Inventory & Booking'],
      },
    },
  ],
};
