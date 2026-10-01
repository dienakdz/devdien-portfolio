import project1 from '../assets/optimized/project1.webp';
import project2 from '../assets/optimized/project2.webp';

export const projectData = {
  en: [
    {
      title: 'DinQuant',
      summary:
        'A high-performance quantitative trading and backtesting engine for processing financial market data, backtesting custom algorithmic strategies, and calculating risk metrics.',
      problem:
        'Backtesting financial strategies requires reliable data ingestion, low-latency execution simulation, and precise risk metric calculations without lookahead bias.',
      solution:
        'Architected an async Python engine with vectorised data handling, modular strategy interfaces, portfolio performance tracking, and realtime metrics.',
      impact:
        'Demonstrates advanced quantitative data processing, async pipeline architecture, and high-precision financial math computation in Python.',
      tech: ['Python', 'Pandas', 'NumPy', 'FastAPI', 'Docker'],
      repoUrl: 'https://github.com/dienakdz/DinQuant',
      liveUrl: null,
      status: 'Quant Engine',
      image: project1,
    },
    {
      title: 'Travela',
      summary:
        'A full-featured tour booking and travel management platform focused on robust multi-step reservation flows, analytics, and recommendation logic.',
      problem:
        'The tour reservation journey involved multiple steps with concurrency risks, while travel operators needed clear visibility into schedules and trip allocations.',
      solution:
        'Built transactional booking workflows with Laravel and MySQL, combined with Python-powered data handling for destination recommendation models.',
      impact:
        'Created a reliable backend foundation that scales seamlessly for booking states, reporting, and third-party payment gateways.',
      tech: ['Laravel', 'PHP', 'Python', 'MySQL', 'REST API'],
      repoUrl: 'https://github.com/dienakdz/travela',
      liveUrl: null,
      status: 'Case study',
      image: project1,
    },
    {
      title: 'Car Vision RAG',
      summary:
        'A multimodal AI platform combining computer vision feature extraction with Retrieval-Augmented Generation for vehicle inspection and semantic querying.',
      problem:
        'Processing automotive inspection photos and technical manuals concurrently requires fast visual embedding extraction and accurate contextual answers.',
      solution:
        'Built a FastAPI backend integrating image feature extractors with vector search pipelines to retrieve relevant technical documents and inspection results.',
      impact:
        'Proves practical capability in developing AI-powered backend workflows, combining REST APIs with modern LLM and RAG architectures.',
      tech: ['Python', 'FastAPI', 'PyTorch', 'Vector DB', 'RAG'],
      repoUrl: 'https://github.com/dienakdz/car-vision-rag',
      liveUrl: null,
      status: 'AI & Vision',
      image: project2,
    },
    {
      title: 'DevOps Foundations Labs',
      summary:
        'Production-grade infrastructure and automation labs covering containerization, CI/CD pipelines, Kubernetes orchestration, and Linux administration.',
      problem:
        'Deploying modern microservices demands repeatable, secure, and automated delivery pipelines with zero downtime and strict resource boundaries.',
      solution:
        'Standardized Docker multi-stage builds, GitHub Actions CI/CD workflows, Nginx reverse proxy configs, and Kubernetes manifests.',
      impact:
        'Serves as the reusable infrastructure blueprint applied across all backend production deployments and cloud infrastructure.',
      tech: ['Docker', 'Kubernetes', 'CI/CD', 'Linux', 'Nginx'],
      repoUrl: 'https://github.com/dienakdz/devops-foundations-labs',
      liveUrl: null,
      status: 'Infrastructure',
      image: project2,
    },
    {
      title: 'FastAPI Book Management API',
      summary:
        'A production-ready RESTful service with async PostgreSQL, SQLAlchemy ORM, JWT authentication, and automated integration test suites.',
      problem:
        'Building scalable API services requires clean architecture, dependency injection, reliable database connection pooling, and secure token validation.',
      solution:
        'Structured with FastAPI best practices: Pydantic v2 schemas, async database sessions, role-based access control, and Dockerized dev environment.',
      impact:
        'Serves as the reference architecture for building clean, maintainable, and high-throughput Python REST services.',
      tech: ['FastAPI', 'Python', 'PostgreSQL', 'SQLAlchemy', 'Docker'],
      repoUrl: 'https://github.com/dienakdz/fastapi-book-management-api',
      liveUrl: null,
      status: 'Production API',
      image: project1,
    },
    {
      title: 'Veggie',
      summary:
        'An e-commerce platform for organic food retail with real-time delivery logistics integration and inventory-aware order processing.',
      problem:
        'The retail shop needed seamless order orchestration, shipping fee calculations, and tight synchronization between catalog and stock data.',
      solution:
        'Implemented backend workflows for product catalog, checkout, Giao Hang Nhanh (GHN) delivery APIs, and inventory reconciliation.',
      impact:
        'Streamlined order fulfillment and kept inventory accurate across online sales and logistics partners.',
      tech: ['Laravel', 'PHP', 'MySQL', 'GHN API', 'TailwindCSS'],
      repoUrl: 'https://github.com/dienakdz/veggie',
      liveUrl: null,
      status: 'E-Commerce',
      image: project2,
    },
  ],
  vi: [
    {
      title: 'DinQuant',
      summary:
        'Engine giao dịch định lượng & backtesting thuật toán tài chính. Tự động xử lý dữ liệu thị trường, kiểm thử chiến lược và đo lường rủi ro định lượng.',
      problem:
        'Kiểm thử thuật toán tài chính đòi hỏi luồng ingestion dữ liệu liên tục, mô phỏng khớp lệnh độ trễ thấp và tính toán chỉ số rủi ro không bị lookahead bias.',
      solution:
        'Xây dựng engine Python bất đồng bộ kết hợp vector hóa dữ liệu với Pandas/NumPy, module hóa giao diện chiến lược và theo dõi hiệu suất danh mục.',
      impact:
        'Thể hiện năng lực tính toán dữ liệu tài chính hiệu năng cao, kiến trúc pipeline xử lý dữ liệu và toán học định lượng bằng Python.',
      tech: ['Python', 'Pandas', 'NumPy', 'FastAPI', 'Docker'],
      repoUrl: 'https://github.com/dienakdz/DinQuant',
      liveUrl: null,
      status: 'Quant Engine',
      image: project1,
    },
    {
      title: 'Travela',
      summary:
        'Nền tảng đặt tour trực tuyến tập trung vào luồng booking nhiều trạng thái, gợi ý điểm đến thông minh và quản trị vận hành.',
      problem:
        'Quy trình đặt tour nhiều bước dễ gây nghẽn dữ liệu, trong khi phía vận hành cần theo dõi lịch trình và dữ liệu phân bổ hành khách chính xác.',
      solution:
        'Xây dựng workflow booking bảo đảm tính toàn vẹn giao dịch bằng Laravel & MySQL, tích hợp engine Python xử lý logic gợi ý tour du lịch.',
      impact:
        'Tạo nền backend tin cậy để mở rộng các tính năng đặt chỗ, báo cáo vận hành và cổng thanh toán trực tuyến.',
      tech: ['Laravel', 'PHP', 'Python', 'MySQL', 'REST API'],
      repoUrl: 'https://github.com/dienakdz/travela',
      liveUrl: null,
      status: 'Case study',
      image: project1,
    },
    {
      title: 'Car Vision RAG',
      summary:
        'Hệ thống AI đa phương thức kết hợp Computer Vision & RAG để kiểm tra phương tiện và tra cứu tài liệu kỹ thuật thông minh.',
      problem:
        'Xử lý đồng thời hình ảnh kiểm định xe và kho tài liệu kỹ thuật phức tạp cần trích xuất đặc trưng thị giác nhanh và trả lời chính xác theo ngữ cảnh.',
      solution:
        'Xây dựng backend FastAPI tích hợp mô hình vision feature extraction với pipeline tìm kiếm vector và mô hình ngôn ngữ lớn (RAG).',
      impact:
        'Chứng minh năng lực triển khai thực tế các luồng backend tích hợp AI hiện đại, kết nối REST API với kiến trúc RAG.',
      tech: ['Python', 'FastAPI', 'PyTorch', 'Vector DB', 'RAG'],
      repoUrl: 'https://github.com/dienakdz/car-vision-rag',
      liveUrl: null,
      status: 'AI & Vision',
      image: project2,
    },
    {
      title: 'DevOps Foundations Labs',
      summary:
        'Bộ lab chuẩn hóa hạ tầng và quy trình CI/CD: đóng gói Docker container, điều phối Kubernetes, reverse proxy Nginx và quản trị Linux.',
      problem:
        'Việc triển khai microservices hiện đại đòi hỏi môi trường triển khai có thể tái lập, bảo mật và tự động hóa cao mà không gây gián đoạn.',
      solution:
        'Thiết lập pipeline GitHub Actions CI/CD, chuẩn hóa Dockerfile multi-stage, cấu hình Nginx tối ưu và manifest triển khai Kubernetes.',
      impact:
        'Trở thành bộ khung hạ tầng chuẩn được áp dụng trực tiếp cho các dự án backend thực tế và môi trường production.',
      tech: ['Docker', 'Kubernetes', 'CI/CD', 'Linux', 'Nginx'],
      repoUrl: 'https://github.com/dienakdz/devops-foundations-labs',
      liveUrl: null,
      status: 'Hạ tầng',
      image: project2,
    },
    {
      title: 'FastAPI Book Management API',
      summary:
        'RESTful API chuẩn production với FastAPI, kết nối async PostgreSQL, SQLAlchemy ORM, phân quyền JWT và bộ unit test tự động.',
      problem:
        'Xây dựng dịch vụ API mở rộng cần kiến trúc sạch (clean architecture), dependency injection, connection pool tối ưu và bảo mật token.',
      solution:
        'Áp dụng FastAPI best practices: schema Pydantic v2, async database session, bảo mật RBAC với JWT và đóng gói Docker hoàn chỉnh.',
      impact:
        'Đóng vai trò là kiến trúc tham chiếu mẫu cho việc xây dựng các REST service bằng Python có thông lượng cao và dễ bảo trì.',
      tech: ['FastAPI', 'Python', 'PostgreSQL', 'SQLAlchemy', 'Docker'],
      repoUrl: 'https://github.com/dienakdz/fastapi-book-management-api',
      liveUrl: null,
      status: 'Production API',
      image: project1,
    },
    {
      title: 'Veggie',
      summary:
        'Nền tảng thương mại điện tử thực phẩm sạch với tích hợp vận chuyển thời gian thực và quản lý tồn kho bám sát đơn hàng.',
      problem:
        'Cửa hàng cần luồng checkout mượt mà, tính cước vận chuyển tự động và kiểm soát đồng bộ tồn kho với đối tác giao nhận.',
      solution:
        'Thiết kế backend cho catalog sản phẩm, checkout, tích hợp API Giao Hàng Nhanh (GHN) và xử lý đối soát tồn kho tự động.',
      impact:
        'Tối ưu hóa quy trình xử lý đơn hàng và đảm bảo tính nhất quán dữ liệu giữa cửa hàng online và đơn vị giao vận.',
      tech: ['Laravel', 'PHP', 'MySQL', 'GHN API', 'TailwindCSS'],
      repoUrl: 'https://github.com/dienakdz/veggie',
      liveUrl: null,
      status: 'E-Commerce',
      image: project2,
    },
  ],
};
