/**
 * SOLID 원칙을 준수하는 에러 처리 룰
 *
 * Single Responsibility Principle (SRP):
 * - 각 에러 핸들러는 하나의 책임만 가져야 함
 *
 * Open/Closed Principle (OCP):
 * - 에러 처리 로직은 확장에는 열려있고 수정에는 닫혀있어야 함
 *
 * Liskov Substitution Principle (LSP):
 * - 에러 핸들러는 인터페이스를 정확히 구현해야 함
 *
 * Interface Segregation Principle (ISP):
 * - 에러 핸들러 인터페이스는 구체적이고 작아야 함
 *
 * Dependency Inversion Principle (DIP):
 * - 고수준 모듈은 저수준 모듈에 의존하지 않아야 함
 */

module.exports = {
  rules: {
    // 에러 처리 관련 룰들

    // 1. try-catch 블록에서 구체적인 에러 타입을 사용해야 함
    'error-handling/use-specific-error-types': {
      create(context) {
        return {
          CatchClause(node) {
            if (node.param && node.param.type === 'Identifier') {
              const paramName = node.param.name;
              if (
                paramName === 'error' ||
                paramName === 'err' ||
                paramName === 'e'
              ) {
                context.report({
                  node: node.param,
                  message:
                    '구체적인 에러 타입을 사용하세요. (예: ApiError, ValidationError)',
                });
              }
            }
          },
        };
      },
    },

    // 2. 에러 로깅은 일관된 방식으로 해야 함
    'error-handling/consistent-error-logging': {
      create(context) {
        return {
          CallExpression(node) {
            if (
              node.callee.type === 'MemberExpression' &&
              node.callee.object.name === 'console' &&
              (node.callee.property.name === 'log' ||
                node.callee.property.name === 'error')
            ) {
              // 에러 로깅에 구조화된 정보가 포함되어야 함
              const hasStructuredLogging = node.arguments.some(
                (arg) =>
                  arg.type === 'ObjectExpression' &&
                  arg.properties.some(
                    (prop) =>
                      prop.key &&
                      (prop.key.name === 'error' || prop.key.name === 'context')
                  )
              );

              if (!hasStructuredLogging) {
                context.report({
                  node,
                  message:
                    '에러 로깅에는 구조화된 정보(error, context)를 포함하세요.',
                });
              }
            }
          },
        };
      },
    },

    // 3. 에러 메시지는 사용자 친화적이어야 함
    'error-handling/user-friendly-error-messages': {
      create(context) {
        return {
          Literal(node) {
            if (
              typeof node.value === 'string' &&
              node.parent &&
              node.parent.type === 'ThrowStatement'
            ) {
              const message = node.value.toLowerCase();
              const technicalTerms = [
                'undefined',
                'null',
                'typeerror',
                'referenceerror',
              ];

              if (technicalTerms.some((term) => message.includes(term))) {
                context.report({
                  node,
                  message: '사용자 친화적인 에러 메시지를 사용하세요.',
                });
              }
            }
          },
        };
      },
    },

    // 4. 에러 복구 로직이 있어야 함
    'error-handling/error-recovery-strategy': {
      create(context) {
        return {
          CatchClause(node) {
            const catchBlock = node.body;
            const hasRecoveryLogic = catchBlock.body.some(
              (statement) =>
                statement.type === 'TryStatement' ||
                (statement.type === 'ExpressionStatement' &&
                  statement.expression.type === 'CallExpression' &&
                  statement.expression.callee.name === 'retry')
            );

            if (!hasRecoveryLogic) {
              context.report({
                node,
                message: '에러 복구 로직을 추가하세요. (재시도, 대체 로직 등)',
              });
            }
          },
        };
      },
    },

    // 5. 에러 핸들러는 단일 책임을 가져야 함
    'error-handling/single-responsibility-handler': {
      create(context) {
        return {
          FunctionDeclaration(node) {
            if (node.id && node.id.name.toLowerCase().includes('error')) {
              const functionBody = node.body.body;
              const errorHandlingStatements = functionBody.filter(
                (statement) =>
                  statement.type === 'TryStatement' ||
                  statement.type === 'IfStatement' ||
                  statement.type === 'SwitchStatement'
              );

              if (errorHandlingStatements.length > 3) {
                context.report({
                  node,
                  message:
                    '에러 핸들러는 단일 책임을 가져야 합니다. 복잡한 로직은 분리하세요.',
                });
              }
            }
          },
        };
      },
    },

    // 6. 에러 타입별로 다른 처리 로직을 가져야 함
    'error-handling/error-type-specific-handling': {
      create(context) {
        return {
          CatchClause(node) {
            const catchBlock = node.body;
            const hasTypeChecking = catchBlock.body.some(
              (statement) =>
                statement.type === 'IfStatement' &&
                statement.test &&
                (statement.test.type === 'BinaryExpression' ||
                  statement.test.type === 'UnaryExpression')
            );

            if (!hasTypeChecking) {
              context.report({
                node,
                message: '에러 타입별로 다른 처리 로직을 구현하세요.',
              });
            }
          },
        };
      },
    },

    // 7. 에러 컨텍스트 정보를 포함해야 함
    'error-handling/include-error-context': {
      create(context) {
        return {
          ThrowStatement(node) {
            if (node.argument && node.argument.type === 'ObjectExpression') {
              const hasContext = node.argument.properties.some(
                (prop) =>
                  prop.key &&
                  (prop.key.name === 'context' || prop.key.name === 'timestamp')
              );

              if (!hasContext) {
                context.report({
                  node,
                  message:
                    '에러 객체에 컨텍스트 정보(context, timestamp)를 포함하세요.',
                });
              }
            }
          },
        };
      },
    },

    // 8. 에러 핸들러는 확장 가능해야 함
    'error-handling/extensible-error-handling': {
      create(context) {
        return {
          ClassDeclaration(node) {
            if (node.id && node.id.name.toLowerCase().includes('error')) {
              const hasInterface =
                node.implements && node.implements.length > 0;

              if (!hasInterface) {
                context.report({
                  node,
                  message: '에러 핸들러 클래스는 인터페이스를 구현해야 합니다.',
                });
              }
            }
          },
        };
      },
    },

    // 9. 에러 메시지는 국제화 가능해야 함
    'error-handling/internationalizable-error-messages': {
      create(context) {
        return {
          Literal(node) {
            if (
              typeof node.value === 'string' &&
              node.parent &&
              node.parent.type === 'ThrowStatement'
            ) {
              const message = node.value;
              // 하드코딩된 한국어 메시지 감지
              if (
                /[가-힣]/.test(message) &&
                !message.includes('t(') &&
                !message.includes('i18n')
              ) {
                context.report({
                  node,
                  message:
                    '에러 메시지는 국제화 함수를 사용하세요. (예: t(), i18n())',
                });
              }
            }
          },
        };
      },
    },

    // 10. 에러 처리 로직은 테스트 가능해야 함
    'error-handling/testable-error-handling': {
      create(context) {
        return {
          FunctionDeclaration(node) {
            if (node.id && node.id.name.toLowerCase().includes('error')) {
              const hasReturn = node.body.body.some(
                (statement) => statement.type === 'ReturnStatement'
              );

              if (!hasReturn) {
                context.report({
                  node,
                  message:
                    '에러 핸들러는 테스트 가능하도록 결과를 반환해야 합니다.',
                });
              }
            }
          },
        };
      },
    },
  },
};
